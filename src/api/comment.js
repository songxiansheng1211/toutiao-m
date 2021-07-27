import request from '@/utils/request.js'
// 获取文章的评论
export const getArticleComments = params => {
  return request({
    method: 'get',
    url: '/app/v1_0/comments',
    params
  })
}
// 对评论进行点赞
export const likeComment = commentId => {
  return request({
    method: 'post',
    url: '/app/v1_0/comment/likings',
    data: {
      target: commentId
    }
  })
}
// 取消评论点赞
export const cancelLikeComment = commentId => {
  return request({
    method: 'delete',
    url: `/app/v1_0/comment/likings/${commentId}`
  })
}
// 添加评论或回复
export const addComment = data => {
  return request({
    method: 'post',
    url: '/app/v1_0/comments',
    data
  })
}
