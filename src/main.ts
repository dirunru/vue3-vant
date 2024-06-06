import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 引入全局组件样式
import 'vant/lib/index.css'
import { Button, Toast } from 'vant';
import './assets/less/vant_theme.less'




createApp(App).use(router).use(Button).use(Toast).mount('#app')