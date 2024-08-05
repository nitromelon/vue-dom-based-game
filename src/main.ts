import "./styles/reset.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import PopUp from "./components/game-app/tooltip/PopUp.vue";

const routes = [
    {
        path: "/:id",
        component: PopUp,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

createApp(App).use(router).use(createPinia().use(piniaPluginPersistedstate)).mount("#app");
