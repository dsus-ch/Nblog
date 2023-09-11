import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/style.css'
import 'element-plus/dist/index.css'
import App from '@/App.vue'
import router from '@/commom/index'
import ElementPlus from 'element-plus'
import axiosPlugin from '@/plugins/axiosInstance.js'


/**
 * vite
 * vue-router
 * element-plus(ui)
 * axios(http request)
 * pinia(state management)
 * localforage
 * wangeditor
 */


const pinia = createPinia()
// 将axios注入pinia
pinia.use(axiosPlugin)

const app = createApp(App)
  .use(router)
  .use(pinia)
  .use(ElementPlus)
  .mount('#app')