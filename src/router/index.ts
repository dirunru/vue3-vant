import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import BlackLayout from '../views/layout/BlackLayout.vue'
import HomeView from '../views/HomeView.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '首页',
    },
    component: HomeView
  },
  {
    path: '/layout',
    name: 'layout',
    meta: {
      title: '布局',
    },
    component: BlackLayout,
    children:[
    {
      path: 'echart',
      name: 'echart-2',
      meta: {
        title: '环表'
      },
      component: () => import(/* webpackChunkName: "echart" */ '../views/Echart.vue')
    },
  ]
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      title: '关于'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/table',
    name: 'table',
    meta: {
      title: '表格'
    },
    component: () => import(/* webpackChunkName: "tabel" */ '../views/Table.vue')
  },
  {
    path: '/echart',
    name: 'echart',
    meta: {
      title: '环表'
    },
    component: () => import(/* webpackChunkName: "echart" */ '../views/Echart.vue')
  },
  {
    path: '/dicStore',
    name: 'dicStore',
    meta: {
      title: '字典缓存'
    },
    component: () => import(/* webpackChunkName: "form" */ '../views/dicStore.vue')
  },
  {
    path: '/form',
    name: 'form',
    meta: {
      title: '表单封装'
    },
    component: () => import(/* webpackChunkName: "form" */ '../views/Form.vue')
  },
  {
    path: '/upload',
    name: 'upload',
    meta: {
      title: '上传'
    },
    component: () => import(/* webpackChunkName: "form" */ '../views/Upload.vue')
  },
  {
    path: '/complexTable',
    name: 'complexTable',
    meta: {
      title: '上传'
    },
    component: () => import(/* webpackChunkName: "form" */ '../views/ComplexTable.vue')
  },
  {
    path: '/tableSpan',
    name: 'tableSpan',
    meta: {
      title: '上传'
    },
    component: () => import(/* webpackChunkName: "form" */ '../views/TableSpan.vue')
  },
  {
    path: '/downLoad',
    name: 'downLoad',
    meta: {
      title: '下载导入'
    },
    component: () => import(/* webpackChunkName: "downLoad" */ '../views/downLoad.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    meta: {
      title: '404'
    },
    component: () => import(/* webpackChunkName: "not-found" */ '../views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
