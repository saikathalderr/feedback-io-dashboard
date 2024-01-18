<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useReviewsStore } from '@/pinia/useReviews'
import { CSSProperties, h, onMounted, computed } from 'vue'
import reviewListItem from '@/components/dashboard/reviews/reviewListItem.vue'
import reviewStatistics from '@/components/dashboard/reviews/reviewStatistics.vue'
import { Col, Row, Typography, Button, Tooltip } from 'ant-design-vue'
import { RedoOutlined } from '@ant-design/icons-vue'
import ReviewSearch from './reviewSearch.vue'
import ReviewsListEmpty from './reviewsListEmpty.vue'

const stickyHeaderContainer: CSSProperties = {
  position: 'sticky',
  top: '8.5rem',
  zIndex: 1,
}

const reviewsStore = useReviewsStore()
const { fetchReviews, fetchReviewsStatistics, refreshReviews } = reviewsStore
const {
  getReviews,
  searchResults,
  searchQuery,
  loadingReviews,
  total,
  pagination,
} = storeToRefs(reviewsStore)

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

const reviewsList = computed(() => {
  if (searchQuery.value.length > 2) {
    return searchResults.value
  }
  return getReviews.value
})
</script>

<template>
  <div>
    <div>
      <Row :gutter="16">
        <Col :span="18">
          <Row :gutter="16" align="middle">
            <Col :span="16" v-if="!searchQuery">
              <Typography.Text strong>
                Total {{ total }} reviews
              </Typography.Text>
            </Col>
            <Col :span="16" v-if="searchQuery">
              <Typography.Text>
                Total <b> {{ searchResults.length }} reviews found </b> with
                search query
                <i>
                  <b>"{{ searchQuery }}"</b>
                </i>
              </Typography.Text>
            </Col>
            <Col :span="8">
              <Row align="middle" justify="end">
                <Col :span="4">
                  <Tooltip title="Refresh reviews">
                    <Button
                      type="default"
                      shape="circle"
                      @click="refreshReviews"
                      :icon="h(RedoOutlined)"
                    />
                  </Tooltip>
                </Col>
                <Col :span="20">
                  <ReviewSearch />
                </Col>
              </Row>
            </Col>
          </Row>
          <div v-if="reviewsList.length">
            <template v-for="review in reviewsList" :key="review.id">
              <review-list-item :review="review" />
            </template>
          </div>
          <ReviewsListEmpty v-if="!reviewsList.length && !loadingReviews" />
          <Button
            v-if="
              pagination.hasNextPage &&
              !loadingReviews &&
              reviewsList.length &&
              !searchQuery
            "
            type="primary"
            @click="handleLoadMore"
            :loading="loadingReviews"
          >
            Load more
          </Button>
        </Col>
        <Col :span="6">
          <div :style="stickyHeaderContainer">
            <Typography.Text strong> Reviews statistics </Typography.Text>
            <div>
              <review-statistics />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>
