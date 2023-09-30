<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useReviewsStore } from '@/pinia/useReviews'
import { onMounted } from 'vue'
import reviewListItem from '@/components/dashboard/reviews/reviewListItem.vue'
import { Typography } from 'ant-design-vue'

const reviewsStore = useReviewsStore()

const { fetchReviews } = reviewsStore
const { getReviews, loadingReviews, total, pagination } =
  storeToRefs(reviewsStore)

onMounted(async () => {
  if (!getReviews.value.length) {
    await fetchReviews()
  }
})

const handleLoadMore = async () => {
  const { page, hasNextPage } = pagination.value
  if (!hasNextPage) return
  await fetchReviews({
    page: page + 1,
  })
}
</script>

<template>
  <div>
    <Typography.Text strong> Total {{ total }} reviews </Typography.Text>
    <div>
      <a-row :gutter="16">
        <a-col :span="16">
          <template v-for="review in getReviews" :key="review.id">
            <review-list-item :review="review" />
          </template>
          <a-button
            v-if="pagination.hasNextPage"
            type="primary"
            @click="handleLoadMore"
            :loading="loadingReviews"
          >
            Load more
          </a-button>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
