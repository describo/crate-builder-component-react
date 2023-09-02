import {useEffect, useRef, useState} from "react";
import {createApp} from "vue";
import DescriboOptionsApi from "./DescriboOptionsApi";

import DescriboCrateBuilder from "@describo/crate-builder-component";
import "@describo/crate-builder-component/dist/vue/style.css";

let mounted = false

const DescriboNewOptionsApiBased = ({crate}) => {
  const containerRef = useRef(null);
  const [vueInstance, setVueInstance] = useState<any | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      if (mounted) {
        return
      }

      // Create Vue app and mount to container
//       const appCompo = {
//         data() {
//           return {
//             currentCrate: crate,
//           };
//         },
//         methods: {
//           changeCrate(newCrate) {
//             this.currentCrate = newCrate
//           }
//         },
//         template: `
//             <describo-crate-builder
//                 :crate="currentCrate"
//             />
// <!--            <div>{{JSON.stringify(currentCrate)}}</div>-->
//         `,
//       }
      const app = createApp(DescriboOptionsApi);

      app.use(DescriboCrateBuilder);
      //app.use(router);
      mounted = true
      const v = app.mount(containerRef.current);
      setVueInstance(v);
      (v as any).changeCrate(crate);

      console.log("+++ DescriboNewCompositionBased app.mount", v, containerRef.current)
    }


    return () => {
      // Cleanup (optional)
    };
  }, []);

  useEffect(() => {
    if (vueInstance) {
      console.log("(vueInstance as any).changeCrate(crate);");
      (vueInstance as any).changeCrate(crate);
    }
  }, [crate])

  return (
    <>
      <div ref={containerRef}></div>
    </>)
};

export default DescriboNewOptionsApiBased;
