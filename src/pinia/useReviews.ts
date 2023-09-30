import { _apiGetReviewsStatisticsUrl, _apiGetReviewsUrl } from './api'
import axios, { AxiosError } from 'axios'

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

type TStatistic = {
  total: number
  percentage: number
}

type IReviewsStatistics = {
  total: number
  '1': TStatistic
  '2': TStatistic
  '3': TStatistic
  '4': TStatistic
  '5': TStatistic
}

type TReviewsState = {
  reviews: TReview[]
  total: number
  pagination: TReviewsPagination
  loadingReviews: boolean
  statistics: IReviewsStatistics
  loadingStatistics: boolean
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
    statistics: {
      total: 0,
      '1': {
        total: 0,
        percentage: 0,
      },
      '2': {
        total: 0,
        percentage: 0,
      },
      '3': {
        total: 0,
        percentage: 0,
      },
      '4': {
        total: 0,
        percentage: 0,
      },
      '5': {
        total: 0,
        percentage: 0,
      },
    },
    loadingStatistics: false,
  }),
  getters: {
    getReviews(): TReview[] {
      return this.reviews
    },
    isLoadingReviews(): boolean {
      return this.loadingReviews
    },
    getReviewsStatistics(): IReviewsStatistics {
      return this.statistics
    },
    isLoadingReviewsStatistics(): boolean {
      return this.loadingStatistics
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

    async fetchReviewsStatistics(): Promise<void> {
      const { handleAxiosError } = useErrorStore()
      const { getToken } = useAuthStore()
      try {
        this.loadingStatistics = true
        const url = `${_apiGetReviewsStatisticsUrl}`
        const resp = await axios.get(url, {
          headers: {
            ...setAuthorizationHeaders(getToken),
          },
        })
        this.statistics = (resp.data.data as IReviewsStatistics) || {
          total: 0,
          '1': {
            total: 0,
            percentage: 0,
          },
          '2': {
            total: 0,
            percentage: 0,
          },
          '3': {
            total: 0,
            percentage: 0,
          },
          '4': {
            total: 0,
            percentage: 0,
          },
          '5': {
            total: 0,
            percentage: 0,
          },
        }
      } catch (error) {
        handleAxiosError(error as AxiosError)
      } finally {
        this.loadingStatistics = false
      }
    },
    fetchReviewById(id: string): TReview | undefined | null {
      return this.reviews.find((review) => review.id === id)
    },
  },
})
