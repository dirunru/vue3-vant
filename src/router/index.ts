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
    path: '/black',
    name: 'black',
    meta: {
      title: '布局',
    },
    component: BlackLayout,
    children:[{
      path: 'about',
      name: 'about-2',
      meta: {
        title: '关于'
      },
      component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
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
    component: () => import(/* webpackChunkName: "about" */ '../views/Table.vue')
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
    component: () => import(/* webpackChunkName: "echart" */ '../views/Form.vue')
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
