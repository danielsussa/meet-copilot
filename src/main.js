import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from "vue-router";
import WaitingRoom from "@/components/WaitingRoom";
import MeetingRoom from "@/components/MeetingRoom";
import mitt from 'mitt';

const emitter = mitt();

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
app.config.globalProperties.emitter = emitter;

app.use(router)
app.use(TextareaAutosize)

// eslint-disable-next-line no-undef
const port = chrome.runtime.connect("bkofmjmbnifeaijjiibmplifjaipnali",{name: 'dashboard'});
port.onMessage.addListener(msg => {
    if (msg.kind === 'list') {
        emitter.emit("chrome-port-list", msg)
    }
    if (msg.kind === 'transmit') {
        emitter.emit('chrome-port-transmit', msg)
    }
})


document.addEventListener("keydown", (event) => {
    emitter.emit('keydown', event)
});

app.config.globalProperties.port = port

app.mount('#app')