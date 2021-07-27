<template>
    <div class="article_container">
        <!-- 导航栏 -->
      <van-nav-bar
        title="文章详情"
        left-arrow
        @click-left="$router.back()"
        class="app-nav-bar"
      />
      <!-- 标题 -->
      <div class="article-warp">
      <h1 class="title">{{articleData.title}}</h1>
      <van-cell center class="user_info">
          <div slot="title" class="user_name">{{articleData.aut_name}}</div>
          <van-image
            slot="icon"
            class="user_avatar"
            fit="cover"
            round
            :src="articleData.aut_photo"
          />
          <div slot="label" class="pubdate">{{articleData.pubdate | relativeTime}}</div>
          <van-button
            round
            size="small"
            :type="articleData.is_followed ? 'default': 'info'"
            class="follow_btn"
            :loading="isFollowLoading"
            :icon="articleData.is_followed ? '' : 'plus'"
            @click="onFollow"
          >
            {{articleData.is_followed ? '已关注' : '关注'}}
          </van-button>
      </van-cell>
      <div
      class="markdown-body"
      v-html="articleData.content"
      ref="article-content">
      </div>
      <commentList :articleId="articleId" :list="commentList" @totalCount="totalCommentCount = $event" @reply-click="onReplyClick"></commentList>
      </div>
      <!-- 底部 -->
      <div class="article_bottom">
        <van-button
        class="comment-btn"
        type="default"
        @click="onWriteComment"
        round
        size="small">写评论</van-button>
        <div class="comment-icon">
        <van-icon
        name="comment-o" :info="totalCommentCount" color="#777" class="icon">
        </van-icon>
        <van-icon
        :name="articleData.is_collected ? 'star' : 'star-o'"
        :color="articleData.is_collected ? 'orange' : '#777'"
        class="icon"
        @click="onCollect">
        </van-icon>
        <van-icon
        :name="articleData.attitude === 1 ? 'good-job' : 'good-job-o'"
        :color="articleData.attitude === 1 ? 'hotpink' : '#777'"
        class="icon"
        @click="onLike">
        </van-icon>
        <van-icon
        name="share" color="#777" class="icon">
        </van-icon>
        </div>
      </div>
      <!-- 发布评论 -->
      <van-popup v-model="isPostShow" position="bottom">
        <postComment
        :target="articleId"
        @post-success="onPostSuccess"></postComment>
      </van-popup>
      <!-- 评论回复 -->
      <van-popup v-model="isReplyShow" position="bottom">
        <commentReply :presentComment="onClickCommentReply" @close="isReplyShow = false" v-if="isReplyShow" :article-id="articleId"></commentReply>
      </van-popup>
    </div>
</template>
<script>
import { getArticlesDetails, cancelCollectArticle, collectArticle, likeArticle, cancelLikeArticle } from '@/api/article'
import { addFollow, deleteFollow } from '@/api/user'
import './github-markdown.css'
import { ImagePreview } from 'vant'
import commentList from './components/comment-list.vue'
import postComment from './components/post-comment.vue'
import commentReply from './components/comment-reply.vue'
export default {
  name: 'ArticleIndex',
  data () {
    return {
      totalCommentCount: 0,
      articleData: {},
      isFollowLoading: false, // 用户按钮loading状态
      isPostShow: false, // 控制发布评论的显示状态
      isReplyShow: false, // 控制回复评论的显示状态
      commentList: [],
      onClickCommentReply: {}
    }
  },
  components: {
    commentList,
    postComment,
    commentReply
  },
  created () {
    this.loadArticle()
  },
  props: {
    articleId: {
      // 防止引发props校验设置多类型
      type: [String, Object, Number],
      required: true
    }
  },
  methods: {
    totalCount () {
    },
    async loadArticle () {
      const { data } = await getArticlesDetails(this.articleId)
      this.articleData = data.data
      // 数据改变影响视图更新（DOM数据）不是立即的 在created钩子函数执行的时候并没有进行任何渲染
      // 所以如果需要在修改数据之后马上操作被该数据影响的视图DOM，需要把这个代码放到 $nextTick中
      this.$nextTick(() => {
        this.handlePreviewImage()
      })
    },
    // 处理图片预览
    handlePreviewImage () {
      // 获取DOM容器
      const articleContent = this.$refs['article-content']
      //   得到所有的 img标签
      const imgs = articleContent.querySelectorAll('img')
      //  循环 img 列表 给 img注册点击事件
      // 在事件函数中调用 imagePreview（） 预览
      const imgsPath = []
      imgs.forEach((item, index) => {
        imgsPath.push(item.src)
        item.onclick = function () {
          ImagePreview({
            images: imgsPath, // 图片路径
            startPosition: index // 起始位置
          })
        }
      })
    },
    async onFollow () {
      this.isFollowLoading = true
      if (this.articleData.is_followed) {
        await deleteFollow(this.articleData.aut_id)
      } else {
        await addFollow(this.articleData.aut_id)
      }
      this.articleData.is_followed = !this.articleData.is_followed
      this.isFollowLoading = false
    },
    async onCollect () {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true // 禁止背景点击
      })
      if (this.articleData.is_collected) {
        await cancelCollectArticle(this.articleId)
      } else {
        await collectArticle(this.articleId)
      }
      this.articleData.is_collected = !this.articleData.is_collected
      this.$toast.success(`${this.articleData.is_collected ? '取消' : ''}收藏成功`)
    },
    async onLike () {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true // 禁止背景点击
      })
      if (this.articleData.attitude === 1) {
        await cancelLikeArticle(this.articleId)
        this.articleData.attitude = -1
      } else {
        await likeArticle(this.articleId)
        this.articleData.attitude = 1
      }
      this.$toast.success(`${this.articleData.attitude !== 1 ? '取消' : ''}点赞成功`)
    },
    onWriteComment () {
      this.isPostShow = true
    },
    onPostSuccess (comment) {
      this.commentList.unshift(comment)
      this.totalCommentCount++
      this.isPostShow = false
    },
    onReplyClick (comment) {
      this.onClickCommentReply = comment
      this.isReplyShow = true
    }
  }
}
</script>
<style lang="less" scoped>
 .title {
     color: #3a3a3a;
     font-size: 20px;
     padding: 14px;
     background-color: #fff;
     margin: 0;
 }
 .user_info {
     .user_avatar {
         width: 35px;
         height: 35px;
         margin-right: 8px;
     }
    .van-cell__title {
      .user_name {
        font-size: 12px;
        color: #333333;
    }
    .van-cell__label {
        margin: 0;
      .pubdate {
        color: #b4b4b4;
        font-size: 12px;
      }
    }
     }
    .follow_btn {
        width: 85px;
        height: 25px;
    }
 }
 .markdown-body {
     padding: 14px;
     background-color: #fff;
 }
 .article_bottom {
     height: 44px;
     width: 100%;
     background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    .comment-btn {
        margin-top: 12px;
        float: left;
        width: 140px;
        height: 22px;
        margin-left: 15px;
    }
    .comment-icon {
      .icon {
          margin-left: 25px;
          margin-top: 10px;
      }
    }
 }
 .article-warp {
   position: fixed;
   top: 46px;
   bottom: 44px;
   right: 0;
   left: 0;
   overflow-y: auto; //内部滚动
 }
</style>
