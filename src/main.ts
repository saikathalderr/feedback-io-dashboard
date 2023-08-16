import './style.css'
import 'ant-design-vue/dist/reset.css'

import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Checkbox,
  Col,
  Form,
  FormItem,
  Input,
  InputPassword,
  Layout,
  LayoutContent,
  LayoutFooter,
  LayoutHeader,
  Menu,
  MenuItem,
  PageHeader,
  Row,
  Slider,
  SubMenu,
} from 'ant-design-vue'

import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'

export const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

// ant-design-vue
app.use(Button)
app.use(Form)
app.use(Input)
app.use(Checkbox)
app.use(Row)
app.use(Col)
app.use(Layout)
app.use(Menu)
app.use(Breadcrumb)
app.use(Slider)
app.use(PageHeader)
app.use(SubMenu)
app.use(MenuItem)
app.use(LayoutHeader)
app.use(LayoutContent)
app.use(BreadcrumbItem)
app.use(LayoutFooter)
app.use(FormItem)
app.use(InputPassword)

app.mount('#app')
