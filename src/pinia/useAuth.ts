import { $authStoreKey } from '@/storejs/keys'
import { _apiLoginUrl } from './api'
import axios from 'axios'
import { defineStore } from 'pinia'
import storejs from 'store'

type TAuthState = {
  token: string
  role: string
  firstName: string
  lastName: string
  email: string
  menu: string[]
}

type TLoginPayload = {
  storeCode: string
  email: string
  password: string
}

const storeKey = 'auth'

export const useAuthStore = defineStore(storeKey, {
  state: (): TAuthState => ({
    token: '',
    role: '',
    firstName: '',
    lastName: '',
    email: '',
    menu: [],
  }),
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
    getMenu(): string[] {
      return this.menu
    },
  },
  actions: {
    async login(payload: TLoginPayload): Promise<void> {
      try {
        const resp = await axios.post(_apiLoginUrl, payload)
        const { data } = resp.data
        storejs.remove($authStoreKey)
        storejs.set($authStoreKey, data)
      } catch (error) {
        console.error(error)
      }
    },
    
  },
})
