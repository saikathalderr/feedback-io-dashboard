import { createRouter, createWebHistory } from 'vue-router'

import { $authStoreKey } from './storejs/keys'
import Attributes from './pages/attributes.vue'
import Dashboard from '@/pages/dashboard.vue'
import Developer from '@/pages/developer.vue'
import Login from '@/pages/auth/login.vue'
import Profile from '@/pages/profile.vue'
import Reviews from '@/pages/reviews.vue'
import Settings from '@/pages/settings.vue'
import Users from '@/pages/users.vue'
import products from './pages/products.vue'
import storejs from 'store'

const routes = [
  {
    path: '/', component: Dashboard,
    meta: { requiredAuth: true, title: 'Dashboard' },
    children: [
      {
        path: '/users',
        component: Users,
        meta: { title: 'Users' },
      },
      {
        path: '/reviews',
        component: Reviews,
        meta: { title: 'Reviews' },
      },
      {
        path: '/developer',
        component: Developer,
        meta: { title: 'Developer' },
      },
      {
        path: '/profile',
        component: Profile,
        meta: { title: 'Profile' },
      },
      {
        path: '/settings',
        component: Settings,
        meta: { title: 'Settings' },
      },
      {
        path: '/products',
        component: products,
        meta: { title: 'Products' },
      },
      {
        path: '/attributes',
        component: Attributes,
        meta: { title: 'Attributes' },
      },
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
