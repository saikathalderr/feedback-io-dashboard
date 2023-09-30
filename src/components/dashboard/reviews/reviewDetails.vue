<script setup lang="ts">
import { useUiStore } from '@/pinia/useUI'
import { storeToRefs } from 'pinia'

import { Button, Drawer } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { computed, CSSProperties } from 'vue'

import ReviewDetailsContent from './reviewDetailsContent.vue'

const drawerHeaderStyle: CSSProperties = {
  display: 'none',
}

const drawerFooterStyle: CSSProperties = {
  display: 'flex',
  gap: '.5rem',
  justifyContent: 'flex-end',
}

const router = useRouter()
const uiStore = useUiStore()

const { closeReviewDetailsModal } = uiStore

const { isReviewDetailsModalOpen } = storeToRefs(uiStore)

const query = Object.assign({}, router.currentRoute.value.query)

const handleCloseReviewDetailsModal = () => {
  closeReviewDetailsModal()
  delete query.reviewId
  router.replace({
    query,
  })
}

const reviewId = computed(() =>
  String(router.currentRoute.value.query['reviewId']),
)
</script>

<template>
  <Drawer
    :visible="isReviewDetailsModalOpen"
    :destroyOnClose="true"
    :width="700"
    @close="handleCloseReviewDetailsModal"
    :footer-style="drawerFooterStyle"
    :headerStyle="drawerHeaderStyle"
  >
    <ReviewDetailsContent v-if="reviewId" :reviewId="reviewId" />
  </Drawer>
</template>
