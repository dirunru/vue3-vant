import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 引入全局组件样式
import 'vant/lib/index.css'
import { Button, Toast } from 'vant';
import './assets/less/vant_theme.less'


import { ElCascaderPanel } from "element-plus";
import 'element-plus/theme-chalk/index.css'



const app = createApp(App)
// vant的样式
app.use(Button).use(Toast)

// element-plus组件的注册
app.use(ElCascaderPanel)



app.use(router)
app.mount('#app')