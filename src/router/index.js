import Vue from 'vue'
import VueRouter from 'vue-router' // 路由  link，view
import Layout from '../views/layout' // 简写路径
import Login from '../views/login' // 简写路径
import Home from '@/views/home'
import Article from '@/views/article'
import Publish from '@/views/publish'
import NProgress from 'nprogress'
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
router.beforeEach((to, from, next) => {
  NProgress.start()

  // 如果访问的是登录页面，则直接放行
  if (to.path === '/login') {
    next()
    // 停止代码往后执行
    return
  }

  // 非登录页面，校验登录状态
  // 获取用户 token
  const token = window.localStorage.getItem('user-token')

  // 判断是否有 token 有就通过
  if (token) {
    // 导航通过 放行 访问哪里就往哪里走
    next()
  } else {
    // 没有 就跳转到登录页
    next('/login')

    // 如果在登录页并且是非登录状态访问非登录页面，这里手动终止进度条
    NProgress.done()
  }
})

// 路由导航结束后触发钩子函数

router.afterEach((to, from) => {
  // 结束顶部的导航进度条
  NProgress.done()
})
export default router
