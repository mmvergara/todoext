//  App and Router
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Store
import { store, storeKey } from "./store";

// Toastify
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";

// Css
import "./assets/main.css";
import "vue3-toastify/dist/index.css";

const app = createApp(App);
app.use(router);
app.use(store, storeKey);
app.use(Vue3Toastify, {
  theme: "dark",
} as ToastContainerOptions);

app.mount("#app");
