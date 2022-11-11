import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "Welcome",
        component: () =>
            import(/* webpackChunkName: "Welcome" */ "./App"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;

createApp(App).mount('#app')