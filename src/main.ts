import "./styles/reset.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
createApp(App).use(createPinia().use(piniaPluginPersistedstate)).mount("#app");
