import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 引入全局组件样式
import 'vant/lib/index.css'
import { Button, Toast, Empty, NavBar, Image, Icon, Sidebar, SidebarItem, Swipe, SwipeItem } from 'vant'

import './assets/less/index.less'
import "./assets/scss/element_theme.scss"

const app = createApp(App)
// vant的样式
app.use(Button)
  .use(Toast)
  .use(Empty)
  .use(NavBar)
  .use(Image)
  .use(Icon)
  .use(Sidebar)
  .use(SidebarItem)
  .use(Swipe)
  .use(SwipeItem)

app.use(router)
app.mount('#app')


// 完整导入-导入所有
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// app.use(ElementPlus)

// 手动按需引入
// import 'element-plus/theme-chalk/index.css';
// import { ElCascaderPanel, ElTable } from 'element-plus'
// app.use(ElCascaderPanel).use(ElTable)// element-plus组件的注册