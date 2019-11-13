import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home' // 简写路径
import Login from '../views/login' // 简写路径
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  // 一级路由 主页
  {
    path: '/home',
    name: 'home',
    component: Home
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
