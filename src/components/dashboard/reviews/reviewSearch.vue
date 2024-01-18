<script setup lang="ts">
import { debounce } from 'lodash-es'
import { InputSearch } from 'ant-design-vue'
import { useReviewsStore } from '@/pinia/useReviews'
import { storeToRefs } from 'pinia'

const reviewsStore = useReviewsStore()
const { fetchReviewsByKeyword } = reviewsStore
const { loadingSearchResults, searchQuery } = storeToRefs(reviewsStore)

const handleReviewSearch = async (e: Event) => {
  const value = (e.target as HTMLInputElement)?.value?.trim()
  await fetchReviewsByKeyword(value)
}

const handleDebounceReviewSearch = debounce(handleReviewSearch, 500)
</script>

<template>
  <InputSearch
    v-model:value="searchQuery"
    placeholder="Search reviews"
    @change="handleDebounceReviewSearch"
    :loading="loadingSearchResults"
  />
</template>
