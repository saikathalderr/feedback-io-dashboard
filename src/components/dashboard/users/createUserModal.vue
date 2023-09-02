<script lang="ts" setup>
import { TenantUserRole } from '@/pinia/useTenantUsers'
import { computed, reactive, ref, CSSProperties } from 'vue'
const open = ref<boolean>(false)
const modalTitle = ref<string>('Create New User')
const modalCtaTitle = ref<string>('Create User')
const modalOkText = ref<string>('Send Invite')

const formState = reactive({
  email: '',
  role: '',
})

const showModal = () => {
  open.value = true
}

const handleOk = (e: MouseEvent) => {
  console.log(e)
  open.value = false
}

const roles = computed(() => {
  return Object.keys(TenantUserRole).map((role) => role)
})
const formStyles: CSSProperties = {
  paddingTop: '1rem',
}
</script>

<template>
  <div>
    <a-button type="primary" @click="showModal">
      {{ modalCtaTitle }}
    </a-button>
    <a-modal
      v-model:open="open"
      :title="modalTitle"
      :ok-text="modalOkText"
      @ok="handleOk"
    >
      <a-form
        :model="formState"
        @finish="handleOk"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 21 }"
        :style="formStyles"
      >
        <a-form-item label="Email" required>
          <a-input v-model:value="formState.email" />
        </a-form-item>
        <a-form-item label="Role" required>
          <a-select v-model:value="formState.role">
            <a-select-option v-for="role in roles" :key="role" :value="role">
              {{ role }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
