import {useEffect, useRef, useState} from 'react';
import {App, createApp} from "vue";
import {ComponentPublicInstance} from "@vue/runtime-core";
import {DescriboCrateBuilderProps} from "./types";
import {createRouter, createWebHistory} from "vue-router";
// @ts-ignore
import Bridge from "./Bridge.vue";
// @ts-ignore
import DescriboCrateBuilderVue from "@describo/crate-builder-component";
import './index.css'
import "@describo/crate-builder-component/dist/vue/style.css";
import "element-plus/dist/index.css";
import "@fortawesome/fontawesome-free/js/all";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoReplaceSvg = "nest";

function DescriboCrateBuilder(props: DescriboCrateBuilderProps) {
  // The element we mount onto
  const containerRef = useRef(null);

  // Make sure we mount Bridge only once
  const mountedRef = useRef(false);

  // The app based on Bridge
  const [bridgeApp, setBridgeApp] = useState<App>()

  // The Bridge app instance mounted
  const [bridgeInstance, setBridgeInstance] = useState<ComponentPublicInstance>()

  // Initialize Vue component bridge
  useEffect(() => {
    if (containerRef.current) {
      if (mountedRef.current) {
        return
      }

      const app = createApp(Bridge)
      app.use(DescriboCrateBuilderVue)
      if (props.enableInternalRouting) {
        const router = createRouter({
          history: createWebHistory("/"),
          routes: [
            {
              path: "/",
              name: "root",
              component: Bridge,
            },
          ],
        });
        app.use(router);
      }
      setBridgeApp(app)

      const instance = app.mount(containerRef.current);
      // Force rerender with props set on the vue component
      setTimeout(() => {
        console.log("+++ setTimeout");
        (instance as any).updateProps(props);
      }, 1)
      setBridgeInstance(instance)

      // Make sure not mounted more than once
      mountedRef.current = true
    }

    return () => {
      if (bridgeApp) {
        bridgeApp.unmount()
      }
    };
  }, []);

  // Sync vue component props with react props
  useEffect(() => {
    if (bridgeInstance) {
      (bridgeInstance as any).updateProps(props)
    }
  }, [props])

  // console.log("+++ Bridge", Bridge)
  // console.log("+++ bridgeApp", bridgeApp)
  // console.log("+++ bridgeInstance", bridgeInstance)

  return (
    <>
      {/*Props in react:<div>{ JSON.stringify(props) }</div>*/}
      {/*<hr/>*/}
      <div ref={containerRef}></div>
    </>)
}

export default DescriboCrateBuilder
