import './style.css'
import 'ant-design-vue/dist/reset.css'

import {
  Button,
  Checkbox,
  Col,
  Form,
  FormItem,
  Input,
  InputPassword,
  Row,
} from 'ant-design-vue'

import App from './App.vue'
import { createApp } from 'vue'
import router from './router'

export const app = createApp(App)

app.use(router)

// ant-design-vue
app.use(Button)
app.use(Form)
app.use(Input)
app.use(Checkbox)
app.use(Row)
app.use(Col)
app.use(FormItem)
app.use(InputPassword)

app.mount('#app')
