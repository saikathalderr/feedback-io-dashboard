<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useReviewsStore } from '@/pinia/useReviews'
import { CSSProperties, onMounted } from 'vue'
import reviewListItem from '@/components/dashboard/reviews/reviewListItem.vue'
import reviewStatistics from '@/components/dashboard/reviews/reviewStatistics.vue'
import { Typography } from 'ant-design-vue'

const statisticsContainer: CSSProperties = {
  position: 'sticky',
  top: '8rem',
}

const reviewsStore = useReviewsStore()

const { fetchReviews, fetchReviewsStatistics } = reviewsStore
const { getReviews, loadingReviews, total, pagination } =
  storeToRefs(reviewsStore)

onMounted(async () => {
  if (!getReviews.value.length) {
    await fetchReviews()
    await fetchReviewsStatistics()
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
    <div>
      <a-row :gutter="16">
        <a-col :span="18">
          <Typography.Text strong> Total {{ total }} reviews </Typography.Text>
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
        <a-col :span="6">
          <div :style="statisticsContainer">
            <Typography.Text strong> Reviews statistics </Typography.Text>
            <div>
              <review-statistics />
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
