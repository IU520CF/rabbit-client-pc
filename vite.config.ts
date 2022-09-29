import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";

import { join } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // 设置项目启动端口
  server: { port: 8080 },
  // 实现 less代码解析
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `
            true; 
            @import "${join(__dirname, "./src/assets/styles/variables.less")}"; 
            @import "${join(__dirname, "./src/assets/styles/mixin.less")}";
          `,
        },
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    Components({
      dirs: ["src/components", "src/views"],
      deep: true,
      extensions: ["vue"],
      dts: "components.d.ts",
    }),
    AutoImport({
      // 注册要自动引入的库
      imports: ["vue", "vue-router", "pinia", "@vueuse/core"],
      // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
      dts: "auto-import.d.ts",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
