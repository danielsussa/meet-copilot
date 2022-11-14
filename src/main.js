import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from "vue-router";
import WaitingRoom from "@/components/WaitingRoom";
import MeetingRoom from "@/components/MeetingRoom";

const routes = [
    { path: '/', component: WaitingRoom },
    { path: '/rooms/:room', component: MeetingRoom },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

import TextareaAutosize from 'vue-textarea-autosize'

const app = createApp(App)
app.use(router)
app.use(TextareaAutosize)
app.mount('#app')