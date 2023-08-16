<script setup lang="ts">
import { HomeOutlined } from '@ant-design/icons-vue'
import { ref, watch, CSSProperties } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const breadcrumbPaths = ref<string[]>([])

watch(
  () => router.currentRoute.value.path,
  (path) => {
    const paths = path.split('/').filter((path) => path !== '')
    breadcrumbPaths.value = paths
  },
  { immediate: true },
)

const breadcrumbStyle: CSSProperties = {
  margin: '16px 0',
}
</script>

<template>
  <a-breadcrumb :style="breadcrumbStyle">
    <a-breadcrumb-item>
      <RouterLink to="/">
        <HomeOutlined />
        Home
      </RouterLink>
    </a-breadcrumb-item>
    <a-breadcrumb-item
      v-for="path in breadcrumbPaths"
      :key="`breadcrumb-item-` + path"
    >
      <RouterLink :to="`/` + path">
        {{ path }}
      </RouterLink>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>
