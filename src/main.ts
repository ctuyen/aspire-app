import { createApp } from "vue";
import VScrollLock from "v-scroll-lock";
import router from "./router";
import store from "./store";
import App from "./App.vue";
import "./main.css";
import "vue3-carousel/dist/carousel.css";

createApp(App).use(router).use(store).use(VScrollLock).mount("#app");
