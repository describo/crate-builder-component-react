import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import vue from "@vitejs/plugin-vue";
// import AutoImport from "unplugin-auto-import/vite";
// import Components from "unplugin-vue-components/vite";
// import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({

  // For Describo
  plugins: [
    react(),
    vue(),
    // AutoImport({
    //   resolvers: [ElementPlusResolver()],
    // }),
    // Components({
    //   resolvers: [ElementPlusResolver()],
    // }),
  ],
  optimizeDeps: {
    include: ["element-plus", "lodash", "@describo/crate-builder-component"],
  },

  resolve: {
    // Use that version of Vue, which supports compilation of inline (string) templates
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
    // dedupe: ['vue']
  },

})
