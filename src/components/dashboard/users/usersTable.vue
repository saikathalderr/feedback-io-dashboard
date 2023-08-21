<script setup lang="ts">
import { onMounted } from 'vue'
import { useTenantUsersStore } from '@/pinia/useTenantUsers'
import { storeToRefs } from 'pinia';
import { CrownFilled, SmileFilled, CodeFilled } from '@ant-design/icons-vue'

const tenantUserStore = useTenantUsersStore()
const { fetchTenantUsers } = tenantUserStore
const { tenantUsers } = storeToRefs(tenantUserStore)

const columns = [
  {
    title: 'First Name',
    dataIndex: 'firstName',
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Role',
    dataIndex: 'role',
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
  },
]

onMounted(async () => {
  await fetchTenantUsers()
  
})
</script>

<template>
  <a-table :dataSource="tenantUsers" :columns="columns" size="small">
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'role'">
        <a-tag color="orange"
          v-if="text === 'ADMIN'"
        >
          <CrownFilled />
          {{ text }}
        </a-tag>
        <a-tag color="green"
          v-if="text === 'MEMBER'"
        >
          <SmileFilled />
          {{ text }}
        </a-tag>
        <a-tag color="cyan"
          v-if="text === 'DEVELOPER'"
        >
          <CodeFilled />
          {{ text }}
        </a-tag>
      </template>
    </template>
  </a-table>
</template>