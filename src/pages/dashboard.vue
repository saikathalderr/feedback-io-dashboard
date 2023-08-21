<script lang="ts" setup>
import { CSSProperties } from 'vue'
import Header from '@/components/dashboard/header.vue';
import Sider from '@/components/dashboard/sider.vue'
import Breadcrumb from '@/components/dashboard/breadcrumb.vue'

const layoutStyle: CSSProperties = {
  height: '100vh',
  padding: '24px',
  background: '#fff',
}

const innerLayoutStyle: CSSProperties = {
  padding: '24px 0',
  height: '100%',
  background: '#fff',
}

</script>

<template>
  <a-layout :style="layoutStyle">
    <a-layout-content>
      <a-layout :style="innerLayoutStyle">
        <Sider />
        <a-layout-content :style="{ padding: '0 24px', minHeight: '280px' }">
          <Header />
          <Breadcrumb />
          <RouterView />
        </a-layout-content>
      </a-layout>
    </a-layout-content>
  </a-layout>
</template>
