import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import vue from "@vitejs/plugin-vue";
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

// import AutoImport from "unplugin-auto-import/vite";
// import Components from "unplugin-vue-components/vite";
// import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'describo-crate-builder-react',
      fileName: 'describo-crate-builder-react',
    },
    minify: false,
    rollupOptions: {
      external: ['react', 'react-dom', 'styled-components'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled',
        },
      },
    },
  },

  // For Describo
  plugins: [
    react(),
    vue(),
    dts({
      include:[
        "src/index.ts",
        "src/types.ts",
        "src/Bridge.vue",
        "src/DescriboCrateBuilder.tsx",
      ]
    })
    // AutoImport({
    //   resolvers: [ElementPlusResolver()],
    // }),
    // Components({
    //   resolvers: [ElementPlusResolver()],
    // }),
  ],
  optimizeDeps: {
    include: [
      "element-plus",
      "lodash",
      "@describo/crate-builder-component",
      "ajv", // Supress: The requested module '/node_modules/ajv/dist/ajv.js?v=09173956' does not provide an export named 'default'
      "dayjs" // Supress: SyntaxError: The requested module '/node_modules/dayjs/dayjs.min.js?v=26ae2de4' does not provide an export named 'default' (at Date.component.vue:21:8)
    ],
  },

  resolve: {
    // Use that version of Vue, which supports compilation of inline (string) templates
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
    },
  },

})
