import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path:'/',
        name:'index',
        component: () => import('@/views/index.vue'),
      },
      {
        path:'/pump',
        name:'pump',
        component:() => import('@/views/pump.vue')
      },
      {
        path:'/index',
        redirect:'/'
      }
    ]
  })

  export default router