import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPersistedState from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

import "normalize.css";
import "@/assets/styles/common.less";
const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersistedState);
app.use(createPinia());
app.use(router);
app.use(pinia);
app.mount("#app");
