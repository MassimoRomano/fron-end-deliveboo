import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from "module";
import router from './router.js'

createApp(App).use(router).mount('#app')
