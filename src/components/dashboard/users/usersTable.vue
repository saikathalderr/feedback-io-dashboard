<script setup lang="ts">
import { CSSProperties, onMounted, h } from 'vue'
import { useTenantUsersStore } from '@/pinia/useTenantUsers'
import { storeToRefs } from 'pinia'
import { CrownFilled, SmileFilled, CodeFilled } from '@ant-design/icons-vue'
import {
  EllipsisOutlined,
  DeleteOutlined,
  ApiOutlined,
} from '@ant-design/icons-vue'
import CreateUserModal from './createUserModal.vue'

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
    title: 'Status',
    dataIndex: 'isActive',
    key: 'isActive',
  },
  {
    title: 'Action',
    key: 'action',
  },
]

onMounted(async () => {
  await fetchTenantUsers()
})

const getStatus = (
  active: boolean,
): {
  color: string
  title: string
} => {
  return {
    color: active ? 'green' : 'red',
    title: active ? 'Active' : 'Disabled',
  }
}

const tableHeaderStyles: CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-start',
  paddingBottom: '10px',
}
const deleteStyle: CSSProperties = {
  color: 'red',
}
const disableStyle: CSSProperties = {
  color: '#eaa720',
}
const enableStyle: CSSProperties = {
  color: 'green',
}
</script>

<template>
  <a-table :dataSource="tenantUsers" :columns="columns" size="small">
    <template #bodyCell="{ column, text }">
      <template v-if="column.dataIndex === 'role'">
        <a-tag color="orange" v-if="text === 'ADMIN'">
          <CrownFilled />
          {{ text }}
        </a-tag>
        <a-tag color="green" v-if="text === 'MEMBER'">
          <SmileFilled />
          {{ text }}
        </a-tag>
        <a-tag color="cyan" v-if="text === 'DEVELOPER'">
          <CodeFilled />
          {{ text }}
        </a-tag>
      </template>

      <template v-if="column.dataIndex === 'isActive'">
        <a-tag :color="getStatus(text).color">
          {{ getStatus(text).title }}
        </a-tag>
      </template>

      <template v-if="column.key === 'action'">
        <a-dropdown placement="bottomRight">
          <a-button :icon="h(EllipsisOutlined)" />
          <template #overlay>
            <a-menu>
              <a-menu-item v-if="text.isActive" key="1" :style="disableStyle">
                <ApiOutlined />
                Disable User
              </a-menu-item>

              <a-menu-item v-else key="2" :style="enableStyle">
                <ApiOutlined />
                Enable User
              </a-menu-item>

              <a-menu-item key="3" :style="deleteStyle">
                <DeleteOutlined />
                Delete User
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </template>
    <template #title>
      <div :style="tableHeaderStyles">
        <CreateUserModal />
      </div>
    </template>
  </a-table>
</template>
