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
// 获取文章详情
export const getArticlesDetails = articleId => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}
// 收藏文章
export const collectArticle = articleId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data: {
      target: articleId
    }
  })
}
// 取消文章收藏
export const cancelCollectArticle = articleId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${articleId}`
  })
}
// 文章点赞
export const likeArticle = articleId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target: articleId
    }
  })
}
// 取消文章点赞
export const cancelLikeArticle = articleId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${articleId}`
  })
}
