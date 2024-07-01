import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
// 引入全局组件样式
import 'vant/lib/index.css'
import { Button, Toast, Empty, NavBar, Image, Icon, Sidebar, SidebarItem, Swipe, SwipeItem, Space } from 'vant'

import './assets/less/index.less'
import "./assets/scss/test.scss"
// 要覆盖的主题样式: 写了这个config里面就可以不写了，目前是写了config
// import "./assets/scss/element_theme.scss"

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
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
  .use(Space)
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