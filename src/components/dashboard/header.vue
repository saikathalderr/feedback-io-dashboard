<script setup lang="ts">
import { CSSProperties } from 'vue'
import Logo from '@/assets/feedback-io.svg'
import { UserOutlined } from '@ant-design/icons-vue'
import { useAuthStore } from '@/pinia/useAuth'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const { logout } = authStore
const { getFullName, getStoreCode } = storeToRefs(authStore)

const handleLogout = async () => {
  await logout()
  router.push(`/login/${getStoreCode.value}`)
}

const headerStyle: CSSProperties = {
  background: '#fff',
  padding: 0,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}
</script>

<template>
  <a-layout-header :style="headerStyle">
    <RouterLink to="/">
      <img :src="Logo" alt="Feedback.io" style="width: 150px" />
    </RouterLink>
    <a-dropdown-button>
      <UserOutlined />
      <span>
        {{ getFullName }}
      </span>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <RouterLink to="/dashboard/profile"> Profile </RouterLink>
          </a-menu-item>
          <a-menu-item>
            <RouterLink to="/dashboard/settings"> Settings </RouterLink>
          </a-menu-item>
          <a-menu-item @click="handleLogout"> Logout </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown-button>
  </a-layout-header>
</template>
