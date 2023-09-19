<script lang="ts" setup>
import { TenantUserRole, useTenantUsersStore } from '@/pinia/useTenantUsers'
import { storeToRefs } from 'pinia'
import { computed, reactive, ref, CSSProperties } from 'vue'
const open = ref<boolean>(false)
const modalTitle = ref<string>('Invite New User')
const modalCtaTitle = ref<string>('Create User')

interface FormState {
  email: string
  role: TenantUserRole
}

const tenantUsersStore = useTenantUsersStore()

const { sendingTenantUserSignupInvite } = storeToRefs(tenantUsersStore)
const { triggerUserSignupInvitationOfTenant } = tenantUsersStore

const formState = reactive<FormState>({
  email: '',
  role: TenantUserRole.MEMBER,
})

const showModal = () => {
  open.value = true
}

const roles = computed(() => {
  return Object.keys(TenantUserRole).map((role) => role)
})

const onFinish = async (values: FormState) => {
  const { email, role } = values
  await triggerUserSignupInvitationOfTenant({ email, role })
  open.value = false
}

const onFinishFailed = (errorInfo: any) => {
  console.log('createUserModal -> errorInfo', errorInfo)
}
const formStyles: CSSProperties = {
  paddingTop: '1rem',
}
</script>

<template>
  <div>
    <a-button type="primary" @click="showModal">
      {{ modalCtaTitle }}
    </a-button>
    <a-modal v-model:open="open" :title="modalTitle" :footer="null">
      <a-form
        :model="formState"
        :label-col="{ span: 3 }"
        :wrapper-col="{ span: 21 }"
        :style="formStyles"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="Email"
          name="email"
          :rules="[
            {
              required: true,
              message: 'The input is not valid E-mail!',
              type: 'email',
            },
          ]"
        >
          <a-input v-model:value="formState.email" />
        </a-form-item>

        <a-form-item
          label="Role"
          name="role"
          :rules="[{ required: true, message: 'Please select a role!' }]"
        >
          <a-select v-model:value="formState.role">
            <a-select-option v-for="role in roles" :key="role" :value="role">
              {{ role }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 3 }">
          <a-button
            type="primary"
            html-type="submit"
            :loading="sendingTenantUserSignupInvite"
          >
            {{
              sendingTenantUserSignupInvite
                ? 'Sending Invitation'
                : 'Send Invitation'
            }}
          </a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
