import {
  _apiGetReviewsStatisticsUrl,
  _apiGetReviewsUrl,
  _apiSearchReviewsUrl,
} from './api'
import axios, { AxiosError } from 'axios'

import { defineStore } from 'pinia'
import { message } from 'ant-design-vue'
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
  searchQuery: string
  searchResults: TReview[]
  loadingSearchResults: boolean
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
    searchQuery: '',
    searchResults: [],
    loadingSearchResults: false,
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
      const hide = message.loading('Fetching reviews...', 0)
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
        hide()
      }
    },

    async refreshReviews(): Promise<void> {
      this.reviews = []
      this.total = 0
      this.pagination = {
        page: 0,
        limit: 0,
        total: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      }
      this.loadingReviews = false
      this.loadingStatistics = false
      this.statistics = {
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
      this.loadingStatistics = false
      this.searchQuery = ''
      this.searchResults = []
      this.loadingSearchResults = false

      await this.fetchReviews()
      await this.fetchReviewsStatistics()
    },

    async fetchReviewsStatistics(): Promise<void> {
      const { handleAxiosError } = useErrorStore()
      const { getToken } = useAuthStore()
      const hide = message.loading('Fetching reviews statistics...', 0)
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
        hide()
      }
    },

    fetchReviewById(id: string): TReview | undefined | null {
      return this.reviews.find((review) => review.id === id)
    },

    async fetchReviewsByKeyword(query: string): Promise<void> {
      this.loadingSearchResults = true
      this.loadingReviews = true
      const { handleAxiosError } = useErrorStore()
      const { getToken } = useAuthStore()
      const hide = message.loading('Searching reviews...', 0)
      try {
        this.searchQuery = query
        const url = `${_apiSearchReviewsUrl}`.replace(
          '{{keyword}}',
          encodeURIComponent(query),
        )
        const resp = await axios.get(url, {
          headers: {
            ...setAuthorizationHeaders(getToken),
          },
        })
        this.searchResults = (resp.data.data.reviews as TReview[]) || []
      } catch (error) {
        handleAxiosError(error as AxiosError)
      } finally {
        this.loadingSearchResults = false
        this.loadingReviews = false
        setTimeout(() => {
          hide()
        }, 1000)
      }
    },
  },
})
