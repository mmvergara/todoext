import "./assets/main.css";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, storeKey } from "./store";

const app = createApp(App);
app.use(store, storeKey);
app.use(router);
app.use(Vue3Toastify, {
  autoClose: 1500,
} as ToastContainerOptions);

app.mount("#app");
