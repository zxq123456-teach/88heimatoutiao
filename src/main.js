import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import axios from 'axios'
import JSONbig from 'json-bigint'
// import moment from 'moment'
import 'nprogress/nprogress.css'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

axios.defaults.transformResponse = [function (data, headers) {
  // Do whatever you want to transform the data

  // axios 默认使用 JSON.parse(data)
  // 我们这里手动配置使用 JSONbig.parse(data)
  try {
    return JSONbig.parse(data)
  } catch (err) {
    console.log(err)
    // 一旦 try 里面的代码执行引发异常，那么就进入 catch 执行
    return {}
  }
}]

// axios请求拦截器
axios.interceptors.request.use(function (config) {
  // 在请求拦截器函数中的 config 是本次请求相关的配置对象
  // config 就是最后要发给后端的那个配置对象
  // 我们可以在拦截器中对 config 进行统一配置定制
  console.log('请求拦截器', config)

  const token = window.localStorage.getItem('user-token')

  // 统一添加 token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // return config 是通行的规则
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// axios响应拦截器
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  console.log('响应拦截器')
  return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

// 将axios共享给所有的实例使用
Vue.prototype.$axios = axios
// 注册整个的所有的elementUI组件
// Vue.use 调用了elementUI里面的一个方法 install => 调用时 传入了 Vue对象
// 在引入 Element 时，可以传入一个全局配置对象。
// 该对象目前支持 size 与 zIndex 字段。
// size 用于改变组件的默认尺寸，
// zIndex 设置弹框的初始 z-index（默认值：2000）

Vue.use(Element, {
  // 项目中所有拥有 size 属性的组件的默认尺寸均为 'small'
  size: 'small'
})
// Vue.filter('dateFormat', (value, format = 'YYYY-MM-DD') => {
//   return moment(value).format(format)
// })

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
