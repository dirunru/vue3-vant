import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 引入全局组件样式
import 'vant/lib/index.css'
import { Button, Toast, Empty, NavBar, Image } from 'vant'
import './assets/less/index.less'

import { ElCascaderPanel } from 'element-plus'
import 'element-plus/theme-chalk/index.css'

const app = createApp(App)
// vant的样式
app.use(Button).use(Toast).use(Empty).use(NavBar).use(Image)

// element-plus组件的注册
app.use(ElCascaderPanel)

app.use(router)
app.mount('#app')
