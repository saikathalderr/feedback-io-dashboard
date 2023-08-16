<script lang="ts" setup>
import { computed, ref, CSSProperties, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/pinia/useAuth'
import { useRouter } from 'vue-router'

type Menu = {
  title: string
  path: string
}

const selectedKeys = ref<string[]>(['1'])

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
    console.log(menu);
    
  },
  { immediate: true },
)

const handleMenuClick = (menu: Menu) => {
  router.push(menu.path)
}

const siderStyle: CSSProperties = {
  padding: '20px',
  background: '#fff',
}

const menuStyle: CSSProperties = {
  height: '100%',
  borderRight: 0,
}

const menuItemStyle: CSSProperties = {
  fontWeight: 'normal',
}
</script>

<template>
  <a-layout-sider width="220" :style="siderStyle">
    <a-menu
      :multiple="false"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="light"
      :style="menuStyle"
    >
      <a-menu-item
        @click="handleMenuClick(menu)"
        v-for="(menu, idx) in menus"
        :style="menuItemStyle"
        :key="idx + 1"
      >
        {{ menu.title }}
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>
