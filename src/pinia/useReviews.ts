import axios, { AxiosError } from 'axios'

import { _apiGetReviewsUrl } from './api'
import { defineStore } from 'pinia'
import { setAuthorizationHeaders } from './headers'
import { useAuthStore } from './useAuth'
import { useErrorStore } from './useError'

export type TReview = {
  id: string
  title: string
  body: string
  rating: number
  isActive: boolean
  orderId: string
  reviewerName: string
  reviewerEmail: string
  reviewerAvatar: string
  createdAt: string
  updatedAt: string
  productId: string
  tenantId: string
  Product: {
    sku: string
    name: string
    thumbnail: string
  }
}

type TReviewsPagination = {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

type TReviewsState = {
  reviews: TReview[]
  total: number
  pagination: TReviewsPagination
  loadingReviews: boolean
}

type TFetchReviewsArgs = {
  page?: number
  limit?: number
}

const storeKey = 'reviews'

export const useReviewsStore = defineStore(storeKey, {
  state: (): TReviewsState => ({
    reviews: [],
    total: 0,
    pagination: {
      page: 0,
      limit: 0,
      total: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    },
    loadingReviews: false,
  }),
  getters: {
    getReviews(): TReview[] {
      return this.reviews
    },
    isLoadingReviews(): boolean {
      return this.loadingReviews
    },
  },
  actions: {
    async fetchReviews({ page, limit }: TFetchReviewsArgs = {}): Promise<void> {
      page = page || 1
      limit = limit || 10

      const { handleAxiosError } = useErrorStore()
      const { getToken } = useAuthStore()
      try {
        this.loadingReviews = true
        const url = `${_apiGetReviewsUrl}?page=${page}&limit=${limit}`
        const resp = await axios.get(url, {
          headers: {
            ...setAuthorizationHeaders(getToken),
          },
        })
        this.reviews = this.reviews.concat(
          (resp.data.data.reviews as TReview[]) || [],
        )
        this.total = (resp.data.data.total as number) || 0
        this.pagination = (resp.data.data.pagination as TReviewsPagination) || {
          page: 0,
          limit: 0,
          total: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPreviousPage: false,
        }
      } catch (error) {
        handleAxiosError(error as AxiosError)
      } finally {
        this.loadingReviews = false
      }
    },
  },
})
