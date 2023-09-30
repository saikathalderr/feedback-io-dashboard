<script lang="ts" setup>
import { CSSProperties } from 'vue'
import Header from '@/components/dashboard/header.vue'
import Sider from '@/components/dashboard/sider.vue'
import Breadcrumb from '@/components/dashboard/breadcrumb.vue'

const layoutStyle: CSSProperties = {
  height: '100vh',
  maxHeight: '100vh',
  background: '#fcfcfc',
}
const innerLayoutStyle: CSSProperties = {
  height: '100%',
  maxHeight: '100%',
  background: '#fcfcfc',
}
const innerLayoutContentStyle: CSSProperties = {
  padding: '0 24px',
  paddingBottom: '24px',
  minHeight: '280px',
  maxHeight: '100%',
  overflow: 'auto',
}
const headerContainerStyle: CSSProperties = {
  marginLeft: '-1rem',
  paddingLeft: '1rem',
  background: '#fcfcfc',
  position: 'sticky',
  top: 0,
  zIndex: 10,
  width: '100%',
}
</script>

<template>
  <a-layout :style="layoutStyle">
    <a-layout-content>
      <a-layout :style="innerLayoutStyle">
        <Sider />
        <a-layout-content :style="innerLayoutContentStyle">
          <div :style="headerContainerStyle">
            <Header />
            <Breadcrumb />
            <a-divider style="marginTop: 0" />
          </div>
          <RouterView />
        </a-layout-content>
      </a-layout>
    </a-layout-content>
  </a-layout>
</template>
