import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import App from './App.vue'
import router from './commom/index'


/**
 * vite
 * vue-router
 * element-ui(plus)
 * fetch(http request)
 * pinia(state management)
 * wangeditor
 */
const app = createApp(App)
const pinia = createPinia()
app.use(ElementPlus);
app.use(pinia);
app.use(router);
app.mount('#app')