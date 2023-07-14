import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    { path: '/login', component: () => import("../views/Login.vue") },
    { 
      path: '/control-panel', component: () => import("../views/controlPanel/ControlPanel.vue") ,
      children:[
        {path:'/category',component:()=> import("../views/controlPanel/Category.vue")},
        {path:'/article',component:()=> import("../views/controlPanel/Article.vue")},
      ]
    },
  ]

export default createRouter({
    history: createWebHashHistory(),
    routes,
})