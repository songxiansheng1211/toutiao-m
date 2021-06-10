// 文章相关请求模块
import request from '@/utils/request.js'

export const getArticles = params => {
  return request({
    method: 'get',
    url: '/app/v1_1/articles',
    params
  })
}
// 获取全部频道
export const getAllArticles = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/channels'
  })
}

export const addUserChannel = data => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data
  })
}

export const deleteUserChannel = id => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${id}`
  })
}
