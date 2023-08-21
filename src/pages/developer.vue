<script lang="ts" setup>
import { defineAsyncComponent, watch, ref } from 'vue'
import { useRouter } from 'vue-router';
const apiKeysTable = defineAsyncComponent(() => import('@/components/dashboard/developer/apiKeysTable.vue'))
const usage = defineAsyncComponent(() => import('@/components/dashboard/developer/usage.vue'))

const router = useRouter()

const tabs = [
  {
    key: 'api-keys',
    tab: 'API Keys',
    component: apiKeysTable
  },
  {
    key: 'usage',
    tab: 'Usage',
    component: usage
  },
]
const firstTabKey = tabs[0].key

const activeKeyFromRoute = router.currentRoute.value.query.tab
const activeKey = ref()

watch(() => activeKeyFromRoute, (tab) => {
  if (tab) {
    activeKey.value = tab
  } else {
    activeKey.value = firstTabKey
  }
}, { immediate: true })

const onTabClick = (key: string) => {
  router.replace({ query: { tab: key } })
}

</script>

<template>
  <a-tabs v-model:activeKey="activeKey" @tabClick="onTabClick">
    <a-tab-pane v-for="tab in tabs" :key="tab.key" :tab="tab.tab">
      <component :is="tab.component" />
    </a-tab-pane>
  </a-tabs>
</template>
