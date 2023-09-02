<script lang="ts" setup>
import {
  CopyTwoTone,
  EllipsisOutlined,
  DeleteOutlined,
  ApiOutlined,
  EditOutlined,
  CheckOutlined,
  DashboardOutlined,
  EyeTwoTone,
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
  fetchDecryptedApiKey,
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
    title: active ? 'Active' : 'Disabled',
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

const encryptedKeyStyle: CSSProperties = {
  userSelect: 'none',
  filter: 'blur(3px)',
}
const decryptedKeyStyle: CSSProperties = {
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
const editableCellStyles: CSSProperties = {
  position: 'relative',
}
const editableCellInputWrapperStyles: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '5px',
}
const tableStyles: CSSProperties = {
  background: '#fff',
}
const tableHeaderStyles: CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-start',
  paddingBottom: '10px',
}
</script>

<template>
  <a-table
    :columns="columns"
    :data-source="getApiKeys"
    size="small"
    :style="tableStyles"
  >
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.dataIndex === 'name'">
        <div :style="editableCellStyles">
          <div
            v-if="editableData[record.key]"
            :style="editableCellInputWrapperStyles"
          >
            <a-input
              v-model:value="editableData[record.key].name"
              @pressEnter="save(record.key)"
            />
            <CheckOutlined @click="save(record.key)" />
          </div>
          <div v-else>
            {{ text || ' ' }}
            <EditOutlined @click="edit(record.key)" />
          </div>
        </div>
      </template>
      <template v-if="column.dataIndex === 'key'">
        <a-tooltip title="Show" v-if="!record.decryptedKey">
          <a-button
            type="ghost"
            size="small"
            ghost
            @click="() => fetchDecryptedApiKey(text)"
          >
            <template #icon>
              <EyeTwoTone />
            </template>
          </a-button>
        </a-tooltip>
        <a-tooltip title="Copy" v-if="record.decryptedKey">
          <a-button
            type="ghost"
            size="small"
            ghost
            @click="() => handleCopyToClipboard(record.decryptedKey)"
          >
            <template #icon>
              <CopyTwoTone />
            </template>
          </a-button>
        </a-tooltip>
        <span :style="encryptedKeyStyle" v-if="!record.decryptedKey">
          {{ record.key }}
        </span>
        <span :style="decryptedKeyStyle" v-if="record.decryptedKey">
          {{ record.decryptedKey }}
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
      <div :style="tableHeaderStyles">
        <a-button
          type="primary"
          @click="() => createApiKey()"
          :loading="creatingApiKey"
        >
          Create API Key
        </a-button>
      </div>
    </template>
  </a-table>
</template>
