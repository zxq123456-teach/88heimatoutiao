import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout' // 简写路径
import Login from '../views/login' // 简写路径
import Home from '@/views/home'
import Article from '@/views/article'
import Publish from '@/views/publish'
Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   redirect: '/home'
  // },
  // 一级路由 主页
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: '/article',
        component: Article
      },
      {
        path: '/publish',
        component: Publish
      }
    ]
  },
  {
    // 一级路由 登录页
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
