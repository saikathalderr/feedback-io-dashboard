import axios, { AxiosError } from 'axios'

import { $authStoreKey } from '@/storejs/keys'
import { _apiLoginUrl } from './api'
import { defineStore } from 'pinia'
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
}

type TLoginPayload = {
  storeCode: string
  email: string
  password: string
}

const storeKey = 'auth'

export const useAuthStore = defineStore(storeKey, {
  state: (): TAuthState => {
    const auth = storejs.get($authStoreKey)
    const { token, menus, user } = auth || {}
    const { role, firstName, lastName, email } = user || {}
    return {
      token,
      role,
      firstName,
      lastName,
      email,
      menus,
    }
  },
  getters: {
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
    getMenus(): string[] {
      return this.menus
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
  },
})
