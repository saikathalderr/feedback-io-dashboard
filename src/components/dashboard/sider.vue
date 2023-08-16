<script lang="ts" setup>
import { computed, ref, CSSProperties, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/pinia/useAuth'
import { useRouter } from 'vue-router'
import type { ItemType } from 'ant-design-vue';

type Menu = ItemType & {
  path: string
}

type MenuClickEvent = {
  key: string
  keyPath: string[]
  item: Menu
  domEvent: Event
}

const selectedKeys = ref<string[]>([])

const authStore = useAuthStore()
const router = useRouter()

const { getMenus } = storeToRefs(authStore)

const menus = computed(() => {
  return getMenus.value as unknown as Menu[]
})

watch(
  () => router.currentRoute.value.path,
  (path) => {
    const menu = menus.value.findIndex((menu) => menu.path === path)
    selectedKeys.value = [String(menu + 1)]
  },
  { immediate: true },
)

const handleMenuClick = (event: MenuClickEvent) => {
  const path = event.item.path  
  router.push(path)
}

const siderStyle: CSSProperties = {
  padding: '20px',
  background: '#fff',
}

const menuStyle: CSSProperties = {
  height: '100%',
  borderRight: 0,
}

</script>

<template>
  <a-layout-sider width="220" :style="siderStyle">
    <a-menu
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="light"
      :style="menuStyle"
      :items="menus"
      @click="handleMenuClick($event)"
    />
  </a-layout-sider>
</template>
