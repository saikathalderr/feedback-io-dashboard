<script lang="ts" setup>
import {
  CopyTwoTone,
  EllipsisOutlined,
  DeleteOutlined,
  ApiOutlined,
  EditOutlined,
  CheckOutlined,
  DashboardOutlined,
} from '@ant-design/icons-vue'
import { useApiKeysStore } from '@/pinia/useApiKeys'
import { storeToRefs } from 'pinia'
import { onMounted, CSSProperties, h, UnwrapRef, reactive } from 'vue'
import dayjs from 'dayjs'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Key',
    dataIndex: 'key',
    key: 'key',
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

const apiKeysStore = useApiKeysStore()
const {
  fetchApiKeys,
  disableApiKey,
  enableApiKey,
  deleteApiKey,
  updateApiKeyName,
  createApiKey,
} = apiKeysStore
const { getApiKeys, creatingApiKey } = storeToRefs(apiKeysStore)

onMounted(async () => {
  await fetchApiKeys()
})

const getStatus = (
  active: boolean,
): {
  color: string
  title: string
} => {
  return {
    color: active ? 'green' : 'red',
    title: active ? 'Active' : 'Revoked',
  }
}

const editableData: UnwrapRef<Record<string, any>> = reactive({})

const save = async (key: string) => {
  const { name } = editableData[key]
  await updateApiKeyName({
    apiKey: key,
    data: {
      name,
    },
  })
  delete editableData[key]
}

const edit = (key: string) => {
  editableData[key] = { ...getApiKeys.value.find((k) => k.key === key) }
}

const handleCopyToClipboard = (key: string) => {
  navigator.clipboard.writeText(key)
}

const keyStyle: CSSProperties = {
  userSelect: 'none',
}
const deleteStyle: CSSProperties = {
  color: 'red',
}
const disableStyle: CSSProperties = {
  color: '#eaa720',
}
const usageStyle: CSSProperties = {
  color: '#3287FF',
}
const enableStyle: CSSProperties = {
  color: 'green',
}
</script>

<template>
  <a-table :columns="columns" :data-source="getApiKeys" size="small">
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'name'">
        <div class="editable-cell">
          <div
            v-if="editableData[record.key]"
            class="editable-cell-input-wrapper"
          >
            <a-input
              v-model:value="editableData[record.key].name"
              @pressEnter="save(record.key)"
            />
            <CheckOutlined
              class="editable-cell-icon-check"
              @click="save(record.key)"
            />
          </div>
          <div v-else class="editable-cell-text-wrapper">
            {{ text || ' ' }}
            <EditOutlined
              class="editable-cell-icon"
              @click="edit(record.key)"
            />
          </div>
        </div>
      </template>
      <template v-if="column.dataIndex === 'key'">
        <a-tooltip title="Copy">
          <a-button
            type="ghost"
            size="small"
            ghost
            @click="() => handleCopyToClipboard(text)"
          >
            <template #icon>
              <CopyTwoTone />
            </template>
          </a-button>
        </a-tooltip>
        <span :style="keyStyle">
          {{ text }}
        </span>
      </template>
      <template v-if="column.dataIndex === 'isActive'">
        <a-tag :color="getStatus(text).color">
          {{ getStatus(text).title }}
        </a-tag>
      </template>
      <template
        v-else-if="
          column.dataIndex === 'createdAt' || column.dataIndex === 'updatedAt'
        "
      >
        {{ dayjs(text).format('DD-MM-YYYY') }}
      </template>
      <template v-if="column.key === 'action'">
        <a-dropdown placement="bottomRight">
          <a-button :icon="h(EllipsisOutlined)" />
          <template #overlay>
            <a-menu>
              <a-menu-item :style="usageStyle" key="1">
                <DashboardOutlined />
                Usage
              </a-menu-item>

              <a-menu-item
                v-if="text.isActive"
                key="2"
                :style="disableStyle"
                @click="() => disableApiKey(text.key)"
              >
                <ApiOutlined />
                Disable Key
              </a-menu-item>

              <a-menu-item
                v-else
                key="3"
                :style="enableStyle"
                @click="() => enableApiKey(text.key)"
              >
                <ApiOutlined />
                Enable Key
              </a-menu-item>

              <a-menu-item
                key="4"
                :style="deleteStyle"
                @click="() => deleteApiKey(text.key)"
              >
                <DeleteOutlined />
                Delete Key
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </template>
    <template #title>
      <a-button
        type="primary"
        @click="() => createApiKey()"
        :loading="creatingApiKey"
      >
        Create API Key
      </a-button>
    </template>
  </a-table>
</template>

<style scoped>
.editable-cell {
  position: relative;
}
.editable-cell-input-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
