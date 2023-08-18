import {
  _apiCreateTenantApiKeyUrl,
  _apiDeleteTenantApiKeyUrl,
  _apiGetTenantApiKeysUrl,
  _apiGetTenantDecryptedApiKeyUrl,
  _apiUpdateTenantApiKeyUrl,
} from './api'
import axios, { AxiosError } from 'axios'

import { defineStore } from 'pinia'
import { setAuthorizationHeaders } from './headers'
import { useAuthStore } from './useAuth'
import { useErrorStore } from './useError'

const storeKey = 'apiKeys'

type TApiKey = {
  id: string
  name: string
  key: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  decryptedKey?: string
}

type TApiKeysState = {
  apiKeys: TApiKey[]
  creatingApiKey: boolean
}

export const useApiKeysStore = defineStore(storeKey, {
  state: (): TApiKeysState => ({
    apiKeys: [],
    creatingApiKey: false,
  }),
  getters: {
    getApiKeys(): TApiKey[] {
      return this.apiKeys
    },
    isCreatingApiKey(): boolean {
      return this.creatingApiKey
    },
  },
  actions: {
    async fetchApiKeys(): Promise<void> {
      const { handleAxiosError } = useErrorStore()
      const { getToken } = useAuthStore()
      try {
        const resp = await axios.get(_apiGetTenantApiKeysUrl, {
          headers: {
            ...setAuthorizationHeaders(getToken),
          },
        })
        this.apiKeys = resp.data.data
      } catch (error) {
        handleAxiosError(error as AxiosError)
      }
    },
    async fetchDecryptedApiKey(apiKey: string): Promise<string | undefined> {
      const { handleAxiosError } = useErrorStore()
      const { getToken } = useAuthStore()
      try {
        const resp = await axios.get(
          _apiGetTenantDecryptedApiKeyUrl.replace(
            '{{apiKey}}',
            encodeURIComponent(apiKey),
          ),
          {
            headers: {
              ...setAuthorizationHeaders(getToken),
            },
          },
        )
        const decryptedApiKey = (resp?.data?.data as string) || ''
        this.apiKeys.find((key) => key.key === apiKey)!.decryptedKey =
          decryptedApiKey
        return decryptedApiKey
      } catch (error) {
        handleAxiosError(error as AxiosError)
      }
    },
    async disableApiKey(apiKey: string): Promise<void> {
      const { handleAxiosError } = useErrorStore()
      const { getToken } = useAuthStore()
      try {
        await axios.put(
          _apiUpdateTenantApiKeyUrl.replace(
            '{{apiKey}}',
            encodeURIComponent(apiKey),
          ),
          {
            isActive: false,
          },
          {
            headers: {
              ...setAuthorizationHeaders(getToken),
            },
          },
        )
        this.apiKeys.find((key) => key.key === apiKey)!.isActive = false
      } catch (error) {
        handleAxiosError(error as AxiosError)
      }
    },
    async enableApiKey(apiKey: string): Promise<void> {
      const { handleAxiosError } = useErrorStore()
      const { getToken } = useAuthStore()
      try {
        await axios.put(
          _apiUpdateTenantApiKeyUrl.replace(
            '{{apiKey}}',
            encodeURIComponent(apiKey),
          ),
          {
            isActive: true,
          },
          {
            headers: {
              ...setAuthorizationHeaders(getToken),
            },
          },
        )
        this.apiKeys.find((key) => key.key === apiKey)!.isActive = true
      } catch (error) {
        handleAxiosError(error as AxiosError)
      }
    },
    async deleteApiKey(apiKey: string): Promise<void> {
      const { handleAxiosError } = useErrorStore()
      const { getToken } = useAuthStore()
      try {
        await axios.delete(
          _apiDeleteTenantApiKeyUrl.replace(
            `{{apiKey}}`,
            encodeURIComponent(apiKey),
          ),
          {
            headers: {
              ...setAuthorizationHeaders(getToken),
            },
          },
        )
        this.apiKeys = this.apiKeys.filter((key) => key.key !== apiKey)
      } catch (error) {
        handleAxiosError(error as AxiosError)
      }
    },
    async updateApiKeyName({
      apiKey,
      data: { name },
    }: {
      apiKey: string
      data: {
        name: string
      }
    }): Promise<void> {
      const { handleAxiosError } = useErrorStore()
      const { getToken } = useAuthStore()
      try {
        await axios.put(
          _apiUpdateTenantApiKeyUrl.replace(
            `{{apiKey}}`,
            encodeURIComponent(apiKey),
          ),
          {
            name,
          },
          {
            headers: {
              ...setAuthorizationHeaders(getToken),
            },
          },
        )
        this.apiKeys.find((key) => key.key === apiKey)!.name = name
      } catch (error) {
        handleAxiosError(error as AxiosError)
      }
    },
    async createApiKey(): Promise<void> {
      const { handleAxiosError } = useErrorStore()
      const { getToken } = useAuthStore()
      try {
        this.creatingApiKey = true
        await axios.post(_apiCreateTenantApiKeyUrl, {
          
        } ,{
          headers: {
            ...setAuthorizationHeaders(getToken),
          },
        })
        await this.fetchApiKeys()
        this.creatingApiKey = false
      } catch (error) {
        this.creatingApiKey = false
        handleAxiosError(error as AxiosError)
      }
    },
  },
})
