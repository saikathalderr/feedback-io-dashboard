import { defineStore } from 'pinia'

type IUIState = {
  isReviewDetailsModalOpen: boolean
}

const storeKey = 'ui'

export const useUiStore = defineStore(storeKey, {
  state: (): IUIState => ({
    isReviewDetailsModalOpen: false,
  }),
  actions: {
    openReviewDetailsModal() {
      this.isReviewDetailsModalOpen = true
    },
    closeReviewDetailsModal() {
      this.isReviewDetailsModalOpen = false
    },
  },
})
