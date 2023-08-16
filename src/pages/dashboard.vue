<script lang="ts" setup>
import { CSSProperties } from 'vue'
import Sider from '@/components/dashboard/sider.vue'

const layoutStyle: CSSProperties = {
  height: '100vh',
}
</script>

<template>
  <a-layout :style="layoutStyle">
    <a-layout>
      <Sider />
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{
            background: '#fff',
            padding: '24px',
            margin: 0,
            minHeight: '280px',
          }"
        >
          <RouterView />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
