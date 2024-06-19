import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 引入全局组件样式
import 'vant/lib/index.css'
import { Button, Toast, Empty, NavBar, Image, Icon, Sidebar, SidebarItem, Swipe, SwipeItem } from 'vant'

import './assets/less/index.less'

import { ElCascaderPanel, ElTable } from 'element-plus'
import 'element-plus/theme-chalk/index.css'
const app = createApp(App)
// vant的样式
app
  .use(Button)
  .use(Toast)
  .use(Empty)
  .use(NavBar)
  .use(Image)
  .use(Icon)
  .use(Sidebar)
  .use(SidebarItem)
  .use(Swipe)
  .use(SwipeItem)

// element-plus组件的注册
app.use(ElCascaderPanel).use(ElTable)

app.use(router)
app.mount('#app')
