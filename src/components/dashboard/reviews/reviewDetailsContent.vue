<script setup lang="ts">
import { CheckCircleTwoTone } from '@ant-design/icons-vue'
import { useReviewsStore } from '@/pinia/useReviews'
import {
  Avatar,
  Col,
  Divider,
  Row,
  Typography,
  Rate,
  Button,
} from 'ant-design-vue'
import { computed, toRefs, CSSProperties } from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

const props = defineProps({
  reviewId: {
    type: String,
    required: true,
  },
})

const dividerStyle: CSSProperties = {
  margin: '.5rem 0',
}

const productThumbnailStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  borderRadius: '0.5rem',
}

const { reviewId } = toRefs(props)

const reviewsStore = useReviewsStore()
const { fetchReviewById } = reviewsStore

const review = computed(() => fetchReviewById(reviewId.value))
</script>

<template>
  <div v-if="review">
    <Row align="middle">
      <Col>
        <Rate :value="review.rating" disabled />
      </Col>
      <Divider type="vertical" />
      <Col>
        <Typography.Text>{{ review.rating }} star</Typography.Text>
      </Col>
      <Divider type="vertical" />
      <Col>
        <CheckCircleTwoTone two-tone-color="#52c41a" v-if="review.isActive" />
      </Col>
      <Divider type="vertical" />
      <Col>
        <Button v-if="review.isActive" type="dashed" danger> Moderate </Button>
        <Button v-else type="dashed"> Unmoderate </Button>
      </Col>
    </Row>

    <br />

    <Row align="middle" :gutter="16">
      <Col :span="22">
        <Typography.Title :level="5">{{ review.title }}</Typography.Title>
        <Typography.Paragraph>{{ review.body }}</Typography.Paragraph>
      </Col>
      <Col :span="2">
        <!-- <img
          :src="review.Product.thumbnail"
          loading="lazy"
          :style="productThumbnailStyle"
        /> -->
      </Col>
    </Row>

    <Row align="middle">
      <Col>
        <Avatar size="small" :src="review.reviewerAvatar" />
      </Col>
      <Divider type="vertical" />
      <Col>
        <Row align="middle">
          <Col>
            <small>{{ review.reviewerName }}</small>
          </Col>
          <Divider type="vertical" />
          <Col>
            <small>{{ review.reviewerEmail }}</small>
          </Col>
          <Divider type="vertical" />
          <Col>
            <Typography.Text type="secondary">
              <small>
                {{ dayjs(review.updatedAt).fromNow() }}
              </small>
            </Typography.Text>
          </Col>
        </Row>
      </Col>
    </Row>

    <Divider :style="dividerStyle" />

    <Row align="middle">
      <Col>
        <Typography.Text type="secondary">
          <small>Product</small>
        </Typography.Text>
      </Col>
      <Divider type="vertical" />
      <Col>
        <Typography.Text>
          <small>{{ review.Product.name }}</small>
        </Typography.Text>
      </Col>
    </Row>
  </div>
</template>
