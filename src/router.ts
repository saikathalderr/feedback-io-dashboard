import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '@/pages/dashboard.vue'
import Login from '@/pages/auth/login.vue'

const routes = [
  { path: '/', component: Dashboard },
  { path: '/login/:storeCode', component: Login },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
