import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    alias: '/home',
    meta: {
      title: '首页'
    },
    component: HomeView
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
