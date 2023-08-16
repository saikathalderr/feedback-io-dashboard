import { createRouter, createWebHistory } from 'vue-router'

import { $authStoreKey } from './storejs/keys'
import Dashboard from '@/pages/dashboard.vue'
import Developer from '@/pages/developer.vue'
import Login from '@/pages/auth/login.vue'
import Reviews from '@/pages/reviews.vue'
import Users from '@/pages/users.vue'
import storejs from 'store'

const routes = [
  {
    path: '/', component: Dashboard,
    meta: { requiredAuth: true },
    children: [
      {
        path: '/users',
        component: Users,
      },
      {
        path: '/reviews',
        component: Reviews,
      },
      {
        path: '/developer',
        component: Developer,
      }
    ],
  },
  {
    path: '/login/:storeCode',
    component: Login,
    meta: { requiredAuth: false },
  },
]

const isAuthenticated = () => {
  const auth = storejs.get($authStoreKey)
  return !!auth
}

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _, next) => {
  if (to.matched.some((record) => record.meta.requiredAuth)) {
    if (!isAuthenticated()) {
      next({ path: '/login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
