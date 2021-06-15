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
          <van-button round size="small" type="info" class="follow_btn" icon="plus">关注</van-button>
      </van-cell>
      <div class="markdown-body" v-html="articleData.content">
      </div>
    </div>
</template>
<script>
import { getArticlesDetails } from '@/api/article'
import './github-markdown.css'
export default {
  name: 'ArticleIndex',
  data () {
    return {
      articleData: {}
    }
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
    async loadArticle () {
      const { data } = await getArticlesDetails(this.articleId)
      console.log('xxxxxxxxxx', data)
      this.articleData = data.data
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
</style>
