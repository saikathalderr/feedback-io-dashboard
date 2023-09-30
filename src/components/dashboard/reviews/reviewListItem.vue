<script setup lang="ts">
import { TReview } from '@/pinia/useReviews'
import { defineProps, CSSProperties } from 'vue'
import { CheckCircleTwoTone } from '@ant-design/icons-vue'
import { Typography } from 'ant-design-vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useUiStore } from '@/pinia/useUI'
import { useRouter } from 'vue-router'

dayjs.extend(relativeTime)

const props = defineProps({
  review: {
    type: Object as () => TReview,
    required: true,
  },
})

const cardStyle: CSSProperties = {
  margin: '1rem 0',
}

const avatarStyle: CSSProperties = {
  width: '1.5rem',
  height: '1.5rem',
  borderRadius: '50%',
  marginRight: '0.5rem',
}

const { review } = props
const { reviewerName, reviewerAvatar, rating, body, updatedAt, isActive } =
  review

const router = useRouter()
const { openReviewDetailsModal } = useUiStore()

const handleOpenReviewDetailsModal = () => {
  openReviewDetailsModal()
  router.replace({
    query: {
      reviewId: review.id,
    },
  })
}
</script>

<template>
  <a-card
    :loading="false"
    :style="cardStyle"
    hoverable
    @click="handleOpenReviewDetailsModal()"
  >
    <div>
      <span>
        <img :src="reviewerAvatar" :style="avatarStyle" loading="lazy" />
        <b>{{ reviewerName }}</b>
      </span>
      <a-divider type="vertical" />
      <a-rate v-model:value="rating" allow-half disabled />
      <a-divider type="vertical" />
      <CheckCircleTwoTone two-tone-color="#52c41a" v-if="isActive" />
    </div>
    <Typography.Paragraph style="margin-top: 0.5rem">{{
      body
    }}</Typography.Paragraph>
    <div>
      <i>
        <Typography.Text type="secondary">
          <small>
            {{ dayjs(updatedAt).fromNow() }}
          </small>
        </Typography.Text>
      </i>
    </div>
  </a-card>
</template>
