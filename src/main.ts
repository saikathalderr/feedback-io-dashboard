import './style.css'
import 'ant-design-vue/dist/reset.css'

import {
  Avatar,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Checkbox,
  Col,
  Dropdown,
  DropdownButton,
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
  Table,
  Tabs,
  Tag,
  Tooltip,
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
app.use(Tag)
app.use(Tooltip)
app.use(Tabs)
app.use(Table)
app.use(Badge)
app.use(Dropdown)
app.use(Avatar)
app.use(SubMenu)
app.use(MenuItem)
app.use(LayoutHeader)
app.use(LayoutContent)
app.use(BreadcrumbItem)
app.use(LayoutFooter)
app.use(FormItem)
app.use(InputPassword)
app.use(DropdownButton)

app.mount('#app')
