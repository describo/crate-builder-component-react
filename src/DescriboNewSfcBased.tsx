/* eslint-disable @typescript-eslint/ban-ts-comment */
import {useEffect, useRef, useState} from 'react';
// @ts-ignore
import VueApp from "./VueApp.vue";
import {createApp} from "vue";
import DescriboCrateBuilder from "@describo/crate-builder-component";
import "@describo/crate-builder-component/dist/vue/style.css";



let mounted = false
const DescriboNewSfcBased = ({crate}) => {
  // const [numberOfClicks, setNumberOfClicks] = useState(0)
  const containerRef = useRef(null);
  // const [mounted, setMounted] = useState(false)
  const [vueInstance, setVueInstance] = useState()

  useEffect(() => {
    if (containerRef.current) {
      if (mounted) {
        return
      }

      const app = createApp(VueApp);
      app.use(DescriboCrateBuilder);
      //app.use(router);
      // eslint-disable-next-line no-debugger
      debugger;
      console.log("+++ DescriboNewSfcBased will app.mount", containerRef.current)
      //setMounted(true)
      mounted = true
      const v = app.mount(containerRef.current);
      setVueInstance(v)
      console.log("+++ DescriboNewSfcBased app.mount", v, containerRef.current)
    }


    return () => {
      // eslint-disable-next-line no-debugger
      //debugger;
      if (vueInstance) {
        vueInstance.unmount()
      }
    };
  }, []);

  useEffect(() => {
    if (vueInstance) {
      console.log("(vueInstance as any).setCurrentCrate(crate);");
      (vueInstance as any).setCurrentCrate(crate);
    }
  }, [crate])

  console.log("+++ VueApp", VueApp)
  console.log("+++ vueInstance", vueInstance)

  return (
    <>
      {/*<div>Number of clicks in react state:{numberOfClicks}</div>*/}
      {/*<ElementPlusButtonInReact onClick={() => setNumberOfClicks(prev=>++prev)}/>*/}
      <div ref={containerRef}></div>
    </>)
};

export default DescriboNewSfcBased;
