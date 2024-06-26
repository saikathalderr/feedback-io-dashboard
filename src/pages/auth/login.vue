<script lang="ts" setup>
import Logo from '@/components/common/logo.vue'
import { MailTwoTone, LockTwoTone, ShopTwoTone } from '@ant-design/icons-vue'
import { reactive, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/pinia/useAuth'
import { storeToRefs } from 'pinia'

const router = useRouter()

interface FormState {
  storeCode: string
  email: string
  password: string
}

const storeCode = router.currentRoute.value.params.storeCode as string

const formState = reactive<FormState>({
  storeCode,
  email: '',
  password: '',
})

const authStore = useAuthStore()

const { login } = authStore
const { isAuthenticated } = storeToRefs(authStore)

const onFinish = async (values: any) => {
  await login(values)
  router.push('/')
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const disabled = computed(() => {
  return !(formState.email && formState.password && formState.storeCode)
})

watch(
  isAuthenticated,
  (value) => {
    console.log('isAuthenticated', value)
    if (value) {
      router.push('/')
    }
  },
  { immediate: true },
)
</script>

<template>
  <a-row justify="center" align="middle" style="height: 100vh">
    <a-col>
      <Logo />
      <a-form
        :model="formState"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          name="storeCode"
          :rules="[{ required: true, message: 'Please input store code!' }]"
        >
          <a-input
            v-model:value="formState.storeCode"
            placeholder="Store code"
            disabled
          >
            <template #prefix>
              <ShopTwoTone />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          name="email"
          :rules="[
            {
              required: true,
              message: 'The input is not valid E-mail!',
              type: 'email',
            },
          ]"
        >
          <a-input v-model:value="formState.email" placeholder="Email">
            <template #prefix>
              <MailTwoTone />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password
            v-model:value="formState.password"
            placeholder="Password"
          >
            <template #prefix>
              <LockTwoTone />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-button :disabled="disabled" type="primary" html-type="submit"
            >Log in</a-button
          >
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>
