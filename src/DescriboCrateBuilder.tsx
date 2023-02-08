import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import "@describo/crate-builder-component/dist/web-component/describo-crate-builder-wc.mjs"
// We should not need it, but we do. Without this the AutoComplete's popup won't have a style.
import "@describo/crate-builder-component/dist/web-component/style.css"
import "./styles.css"


export class Lookup {
  constructor() {
  }

  /**
   *
   * @param {Array | String} type: the type array or type string of the entity being looked up
   * @param {String} queryString: the query string typed in by the user
   * @param {Number} limit=5: the number of matches to return - default = 5
   */
  async entityTemplates({type = undefined, queryString = undefined, limit = 5}) {
    console.log("entityTemplates called")
    // code to lookup entity templates in *YOUR* system
    //
    // type: the @type of template to lookup
    // queryString: what the user is looking for. You probably want to look in the
    //   @id and name fields at least
    // limit: number of matches to return
  }
}

type DescriboCrateBuilderProps = {

}

export default function DescriboCrateBuilder({crate, profile, onDataChange}: any) {
  const ref = useRef();

  // Initial setting of globalThis.DescriboCrateBuilderConfiguration
  const [describoConfig, setDescriboConfig] = useState<any>(() =>{
    const data = {
      crate,
      profile,
      lookup: new Lookup(),
    }
    // @ts-ignore
    globalThis.DescriboCrateBuilderConfiguration = data
    return data
  })

  const [configVersion, setConfigVersion] = useState(1)

  useLayoutEffect(() => {
    const { current }: any = ref;

    current?.addEventListener("save:crate", (event: Event ) => {
        const customEvent = event as CustomEvent;
        onDataChange(customEvent?.detail[0]?.crate, customEvent?.detail[0]?.profile);
      }
    );
  }, [ref]);

  // Update globalThis.DescriboCrateBuilderConfiguration
  useEffect(() => {
    console.log("useEffect", crate, profile)
    const newConfig = {
      crate, profile, lookup: new Lookup()
    }
    setDescriboConfig(newConfig)
    // @ts-ignore
    globalThis.DescriboCrateBuilderConfiguration = newConfig
    setConfigVersion(configVersion+1)
  }, [crate, profile])

  console.log("configVersion", configVersion)
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
