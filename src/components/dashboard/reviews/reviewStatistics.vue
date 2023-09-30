<script setup lang="ts">
import { useReviewsStore } from '@/pinia/useReviews'
import { storeToRefs } from 'pinia'
import { CSSProperties, computed } from 'vue'

const statisticsContainer: CSSProperties = {
  margin: '1rem 0',
}

const title: CSSProperties = {
  fontSize: '.7rem',
  fontWeight: 'bold',
  margin: 0,
}

const header: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

const reviewsStore = useReviewsStore()
const { getReviewsStatistics, isLoadingReviewsStatistics } =
  storeToRefs(reviewsStore)

console.log(getReviewsStatistics.value[1])

const oneStartPercentage = computed(
  () => getReviewsStatistics.value[1].percentage,
)
const twoStartPercentage = computed(
  () => getReviewsStatistics.value[2].percentage,
)
const threeStartPercentage = computed(
  () => getReviewsStatistics.value[3].percentage,
)
const fourStartPercentage = computed(
  () => getReviewsStatistics.value[4].percentage,
)
const fiveStartPercentage = computed(
  () => getReviewsStatistics.value[5].percentage,
)
</script>

<template>
  <a-card :style="statisticsContainer" :loading="isLoadingReviewsStatistics">
    <div>
      <div :style="header">
        <small :style="title">5 star</small>
        <small> {{ fiveStartPercentage }} % </small>
      </div>
      <a-progress
        :percent="fiveStartPercentage"
        stroke-color="#52c41a"
        :show-info="false"
        status="active"
        size="small"
      />
    </div>
    <div>
      <div :style="header">
        <small :style="title">4 star</small>
        <small> {{ fourStartPercentage }} % </small>
      </div>
      <a-progress
        :percent="fourStartPercentage"
        stroke-color="#73d13d"
        :show-info="false"
        status="active"
        size="small"
      />
    </div>

    <div>
      <div :style="header">
        <small :style="title">3 star</small>
        <small> {{ threeStartPercentage }} % </small>
      </div>
      <a-progress
        :percent="threeStartPercentage"
        stroke-color="#ffc53d"
        :show-info="false"
        status="active"
        size="small"
      />
    </div>

    <div>
      <div :style="header">
        <small :style="title">2 star</small>
        <small> {{ twoStartPercentage }} % </small>
      </div>

      <a-progress
        :percent="twoStartPercentage"
        stroke-color="#ff7a45"
        :show-info="false"
        status="active"
        size="small"
      />
    </div>

    <div>
      <div :style="header">
        <small :style="title">1 star</small>
        <small> {{ oneStartPercentage }} % </small>
      </div>
      <a-progress
        :percent="oneStartPercentage"
        stroke-color="#ff4d4f"
        :show-info="false"
        status="active"
        size="small"
      />
    </div>
  </a-card>
</template>
