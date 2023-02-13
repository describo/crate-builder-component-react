import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import "@describo/crate-builder-component/dist/web-component/describo-crate-builder-wc.mjs"
// We should not need it, but we do. Without this the AutoComplete's popup won't have a style.
// https://github.com/vuejs/core/issues/4662
import "@describo/crate-builder-component/dist/web-component/style.css"

type DescriboConfig = ReturnType<typeof toDescriboConfig>

// type for globalThis.DescriboCrateBuilderConfiguration
declare global {
  var DescriboCrateBuilderConfiguration: DescriboConfig
}

export interface JSONObject {
  [key: string]: any;
}

export interface EntityTemplatesParams {
  type?: Array<any> | string;
  queryString?: string;
  limit?: number;
}

export interface Lookup {
  // code to lookup entity templates in *YOUR* system
  //
  // type: the @type of template to lookup
  // queryString: what the user is looking for. You probably want to look in the
  //   @id and name fields at least
  // limit: number of matches to return
  entityTemplates(params: EntityTemplatesParams): Promise<void>;
}

export type DescriboCrateBuilderProps = {
  // The crate to display and edit
  crate?: JSONObject

  // Profile to use when editing the crate
  profile?: JSONObject,

  // Callbacks for crate related lookups
  lookup?: Lookup,
  // mode?: "embedded" | "online",

  // Enable context editor functionality? Only used at component initialization time.
  enableContextEditor?: boolean,

  // Enable crate preview functionality? Only used at component initialization time.
  enableCratePreview?: boolean,

  // Enable entity browser functionality? Only used at component initialization time.
  enableBrowseEntities?: boolean,

  // Enable entity browser functionality? Only used at component initialization time.
  enableTemplateSave?: boolean,

  // If true, component will not allow changes and won't call onSaveCrate()
  readonly?: boolean,

  // Callback when component is ready to be used.
  onReady?: () => void,

  // Callback when component reports an error
  onError?: (message: string) => void,

  // Callback called when the crate has changed.
  onSaveCrate?: (crate: JSONObject) => void,

  // Callback called when the crate is to be saved as a template. If you implement onSaveCrateAsTemmplate, you should
  // also pass a Lookup object with entityTemplates so that the saved templates can be looked up reused in the
  // component.
  onSaveCrateAsTemmplate?: (name: string, crate: JSONObject) => void
}

function toDescriboConfig(props: DescriboCrateBuilderProps) {
  return {
    crate: props.crate,
    profile: props.profile,
    lookup: props.lookup,
    config: {
      enableContextEditor: props.enableContextEditor,
      enableCratePreview: props.enableCratePreview,
      enableBrowseEntities: props.enableBrowseEntities,
      enableTemplateSave: props.enableTemplateSave,
      readonly: props.readonly,
    }
  }
}

export default function DescriboCrateBuilder(props: DescriboCrateBuilderProps) {
  const [configName, _] = useState("DescriboCrateBuilderConfiguration"+"_"+btoa(Math.random().toString()).substring(10,15))
  const [configVersion, setConfigVersion] = useState(1)
  const ref = useRef();

  // @ts-ignore
  if (!globalThis[configName]) {
    // @ts-ignore
    globalThis[configName] = {}
  }

  useLayoutEffect(() => {
    const { current }: any = ref

    current?.addEventListener("save:crate", (event: Event ) => {
        const customEvent = event as CustomEvent
        const crate = customEvent?.detail[0]?.crate
        props.onSaveCrate?.(crate)
      }
    )

    current?.addEventListener("save:crate:template", (event: Event ) => {
        const customEvent = event as CustomEvent;
        const template = customEvent?.detail[0]?.template
        props.onSaveCrateAsTemmplate?.(template.name, template.crate)
      }
    )

    current?.addEventListener("ready", (event: Event ) => {
        const customEvent = event as CustomEvent;
        props.onReady?.()
      }
    )

    current?.addEventListener("error", (event: Event ) => {
        const customEvent = event as CustomEvent;
        const message = customEvent?.detail[0]
        props.onError?.(message)
      }
    )

  }, [ref]);

  // Update globalThis.DescriboCrateBuilderConfiguration
  useEffect(() => {
    // @ts-ignore
    globalThis[configName] = toDescriboConfig(props)
    // Need to update configVersion to inform the vue component about the change
    setConfigVersion(configVersion+1)
  }, [props.crate, props.profile, props.enableBrowseEntities, props.enableCratePreview, props.enableContextEditor, props.enableTemplateSave])

  return(
    <>
      {/*//@ts-ignore*/}
      <describo-crate-builder
        ref={ref}
        config={configName}
        configVersion={configVersion}
      />
    </>
  )
}
