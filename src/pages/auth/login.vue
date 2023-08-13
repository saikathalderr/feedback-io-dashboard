<script lang="ts" setup>
import Logo from '@/components/logo.vue';
import { MailTwoTone, LockTwoTone } from '@ant-design/icons-vue'
import { TypographyText } from 'ant-design-vue'
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

interface FormState {
  email: string
  password: string
}
const formState = reactive<FormState>({
  email: '',
  password: '',
})
const onFinish = (values: any) => {
  console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
const disabled = computed(() => {
  return !(formState.email && formState.password)
})
const storeCode = computed(() => {
  return router.currentRoute.value.params.storeCode || ''
})
</script>

<template>
  <a-row justify="center" align="middle" style="height: 100vh">
    <a-col>
      <Logo />

      <TypographyText>
        Store - <b>{{ storeCode }}</b>
      </TypographyText>

      <br />
      <br />

      <a-form
        :model="formState"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          name="email"
          :rules="[{ required: true, message: 'Please input your email!' }]"
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
