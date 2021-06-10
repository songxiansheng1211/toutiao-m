import axios from 'axios'
// 在非组件模块中 获取store 必须通过这种方式
import store from '@/store/'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})
// 请求拦截器
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 处理完之后config一定要返回
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
export default request
