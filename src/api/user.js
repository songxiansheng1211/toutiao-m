// 用户相关请求模块
import request from '@/utils/request.js'
// 在非组件模块中 获取store 必须通过这种方式
// import store from '@/store/'
// 登录注册
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
// 发送验证码
export const sendSms = params => {
  return request({
    method: 'get',
    url: `/app/v1_0/sms/codes/${params}`
  })
}
// 获取登录用户自己的信息
export const getCurrentUser = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user'
    // headers: {
    // Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
// 获取用户文章列表
export const getUserChannels = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/channels'
  })
}
