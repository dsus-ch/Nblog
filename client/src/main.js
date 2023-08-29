import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/commom/index'
import ElementPlus from 'element-plus'
import '@/style.css'
import 'element-plus/dist/index.css'
import axios from '@/plugins/axiosInstance.js'


/**
 * vite
 * vue-router
 * element-plus(ui)
 * axios(http request)
 * pinia(state management)
 * wangeditor
 */



const pinia = createPinia()
const app = createApp(App)

app.provide('$axios', axios)
app.use(router)
  .use(pinia)
  .use(ElementPlus)
  .mount('#app')