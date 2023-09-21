import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import directive from './directive'

createApp(App).use(router).use(directive).mount('#app')
