import { _apiGetTenantUsersUrl, _apiSentTenantUserSignupInviteUrl } from './api'
import axios, { AxiosError } from 'axios'

import { defineStore } from 'pinia'
import { setAuthorizationHeaders } from './headers'
import { useAuthStore } from './useAuth'
import { useErrorStore } from './useError'

export enum TenantUserRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  DEVELOPER = 'DEVELOPER',
}
type TTenantUser = {
  id: string
  firstName: string
  lastName: string
  email: string
  role: TenantUserRole
  isActive: boolean
  tenantId: string
  createdAt: string
  updatedAt: string
}
type TTenantUsersState = {
  tenantUsers: TTenantUser[]
  loadingTenantUsers: boolean
  sendingTenantUserSignupInvite: boolean
}

type TTriggerUserSignupInvitationOfTenant = {
  email: string
  role: TenantUserRole
}

const storeKey = 'tenantUsers'

export const useTenantUsersStore = defineStore(storeKey, {
  state: (): TTenantUsersState => ({
    tenantUsers: [],
    loadingTenantUsers: false,
    sendingTenantUserSignupInvite: false
  }),
  getters: {
    getTenantUsers(): TTenantUser[] {
      return this.tenantUsers
    },
    isLoadingTenantUsers(): boolean {
      return this.loadingTenantUsers
    },
  },
  actions: {
    async fetchTenantUsers(): Promise<void> {
      const { handleAxiosError } = useErrorStore()
      const { getToken } = useAuthStore()
      try {
        this.loadingTenantUsers = true
        const resp = await axios.get(_apiGetTenantUsersUrl, {
          headers: {
            ...setAuthorizationHeaders(getToken),
          },
        })        
        this.tenantUsers = resp.data.data
        this.loadingTenantUsers = false
      } catch (error) {
        this.loadingTenantUsers = false
        handleAxiosError(error as AxiosError)
      }
    },
    async triggerUserSignupInvitationOfTenant(args: TTriggerUserSignupInvitationOfTenant): Promise<void> {
      const { handleAxiosError } = useErrorStore()
      const { getToken } = useAuthStore()
      try {
        const { email, role } = args
        this.sendingTenantUserSignupInvite = true
        await axios.post(_apiSentTenantUserSignupInviteUrl, {
          email,
          role
        } ,{
          headers: {
            ...setAuthorizationHeaders(getToken),
          },
        },)
        this.sendingTenantUserSignupInvite = false
      } catch (error) {
        this.sendingTenantUserSignupInvite = false
        handleAxiosError(error as AxiosError)
      }
    }
  },
})
