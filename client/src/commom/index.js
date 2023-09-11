import { ElMessage } from 'element-plus'
import { createRouter, createWebHashHistory } from "vue-router"
import { localforageInstance as lfI } from '@/plugins/localforageInstance'

const routes = [
  { 
    path: '/login', 
    component: () => import("@/views/Login.vue") 
  },
  { 
    path: '/control-panel', 
    component: () => import("@/views/controlPanel/ControlPanel.vue") ,
    children:[
      { 
        path:'/category',
        component:()=> import("@/views/controlPanel/Category.vue")
      },
      { path:'/article',
        component:()=> import("@/views/controlPanel/Article.vue")
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, // routes: routes 的缩写
})

//导航守卫，在导航触发（页面还未加载的时候调用）
router.beforeEach((to, from) => {
  lfI.getItem('token').then((value) => {
    if (
      // 检查用户是否已登录
      !value &&
      // ❗️ 避免无限重定向
      to.path != '/login'
    ){
      ElMessage({
        message: '请先登陆！',
        type: 'warning',
      })
      // 将用户重定向到登录页面
      return '/login'
    }
  })
})

export default router