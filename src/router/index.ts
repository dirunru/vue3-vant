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
    path: '/form',
    name: 'form',
    meta: {
      title: 'form表单'
    },
    component: () => import(/* webpackChunkName: "form" */ '../views/Form.vue')
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
