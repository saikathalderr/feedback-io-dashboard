<script lang="ts" setup>
import { CSSProperties } from 'vue'
import Sider from '@/components/dashboard/sider.vue'
import Breadcrumb from '@/components/dashboard/breadcrumb.vue'

const layoutStyle: CSSProperties = {
  height: '100vh',
  background: '#FFF',
}
</script>

<template>
  <a-layout :style="layoutStyle">
    <Sider />
    <a-layout :style="layoutStyle">
      <a-layout-content
        :style="{
          padding: '24px',
          margin: 0,
          minHeight: '280px',
        }"
      >
        <Breadcrumb />
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
