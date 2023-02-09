import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import "@describo/crate-builder-component/dist/web-component/describo-crate-builder-wc.mjs"
// We should not need it, but we do. Without this the AutoComplete's popup won't have a style.
import "@describo/crate-builder-component/dist/web-component/style.css"
import "./styles.css"

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
  crate?: JSONObject
  profile?: JSONObject,
  lookup?: Lookup,
  mode?: "embedded" | "online",
  enableContextEditor?: boolean,
  enableCratePreview?: boolean,
  enableBrowseEntities?: boolean,
  enableTemplateSave?: boolean,
  readonly?: boolean,
  onReady?: () => void,
  onError?: (message: string) => void,
  onSaveCrate?: (crate: JSONObject) => void,
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

globalThis.DescriboCrateBuilderConfiguration = {} as DescriboConfig

export default function DescriboCrateBuilder(props: DescriboCrateBuilderProps) {
  const ref = useRef();

  const [configVersion, setConfigVersion] = useState(1)

  useLayoutEffect(() => {
    const { current }: any = ref

    current?.addEventListener("save:crate", (event: Event ) => {
        const customEvent = event as CustomEvent;
        props.onSaveCrate?.(customEvent?.detail[0]?.crate)
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
    globalThis.DescriboCrateBuilderConfiguration = toDescriboConfig(props)
    // Need to update configVersion to inform the vue component about the change
    setConfigVersion(configVersion+1)
  }, [props.crate, props.profile, props.enableBrowseEntities, props.enableCratePreview, props.enableContextEditor, props.enableTemplateSave])

  return(
    <>
      {/*//@ts-ignore*/}
      <describo-crate-builder
        ref={ref}
        config={"DescriboCrateBuilderConfiguration"}
        configVersion={configVersion}
      />
    </>
  )
}
