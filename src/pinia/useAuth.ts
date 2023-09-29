import {
  AppstoreFilled,
  BuildFilled,
  CodeFilled,
  IdcardFilled,
  SettingFilled,
  SkinFilled,
  StarFilled
} from '@ant-design/icons-vue'
import axios, { AxiosError } from 'axios'

import { $authStoreKey } from '@/storejs/keys'
import { _apiLoginUrl } from './api'
import { defineStore } from 'pinia'
import { h } from 'vue'
import storejs from 'store'
import { useErrorStore } from './useError'
import { useNotificationStore } from './useNotification'

type TAuthState = {
  token: string
  role: string
  firstName: string
  lastName: string
  email: string
  menus: string[]
  storeCode: string
}

type TLoginPayload = {
  storeCode: string
  email: string
  password: string
}

type TMenu = {
  key: string
  label: string
  title: string
  path: string
  icon: any
}

const storeKey = 'auth'

const staticMenus: TMenu[] = [
  {
    key: '1',
    label: 'Dashboard',
    title: 'Dashboard',
    path: '/',
    icon: h(AppstoreFilled),
  },
  {
    key: '2',
    label: 'Reviews',
    title: 'Reviews',
    path: '/reviews',
    icon: h(StarFilled),
  },
  {
    key: '3',
    label: 'Products',
    title: 'Products',
    path: '/products',
    icon: h(SkinFilled),
  },
  {
    key: '4',
    label: 'Attributes',
    title: 'Attributes',
    path: '/attributes',
    icon: h(BuildFilled),
  },
  {
    key: '5',
    label: 'Developer',
    title: 'Developer',
    path: '/developer',
    icon: h(CodeFilled),
  },
  {
    key: '6',
    label: 'Users',
    title: 'Users',
    path: '/users',
    icon: h(IdcardFilled),
  },
  {
    key: '7',
    label: 'Settings',
    title: 'Settings',
    path: '/settings',
    icon: h(SettingFilled),
  },
]

export const useAuthStore = defineStore(storeKey, {
  state: (): TAuthState => {
    const auth = storejs.get($authStoreKey)
    const { token, menus, user } = auth || {}
    const { role, firstName, lastName, email, storeCode } = user || {}
    return {
      token,
      role,
      firstName,
      lastName,
      email,
      menus,
      storeCode,
    }
  },
  getters: {
    isAuthenticated(): boolean {
      return !!this.token
    },
    getToken(): string {
      return this.token
    },
    getRole(): string {
      return this.role
    },
    getFirstName(): string {
      return this.firstName
    },
    getLastName(): string {
      return this.lastName
    },
    getFullName(): string {
      return `${this.firstName} ${this.lastName}`
    },
    getEmail(): string {
      return this.email
    },
    getMenus(): TMenu[] {
      return staticMenus
    },
    getStoreCode(): string {
      return this.storeCode
    },
  },
  actions: {
    async login(payload: TLoginPayload): Promise<void> {
      const { handleAxiosError } = useErrorStore()
      const { showSuccess } = useNotificationStore()
      try {
        const resp = await axios.post(_apiLoginUrl, payload)
        const { data, message } = resp.data
        const { token, role, firstName, lastName, email, menus } = data
        storejs.remove($authStoreKey)
        storejs.set($authStoreKey, data)
        this.token = token
        this.role = role
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.menus = menus
        showSuccess(message)
        return Promise.resolve()
      } catch (error) {
        handleAxiosError(error as AxiosError)
      }
    },
    logout(): void {
      storejs.remove($authStoreKey)
      this.token = ''
      this.role = ''
      this.firstName = ''
      this.lastName = ''
      this.email = ''
      this.menus = []
    },
  },
})
