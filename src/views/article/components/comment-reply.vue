<template>
  <div class="comment-reply-container">
      <!-- 头部信息 -->
      <van-nav-bar :title="`${presentComment.reply_count}条回复`" >
          <div slot="left">
          <van-icon name="cross" @click="$emit('close')" />
          </div>
      </van-nav-bar>
      <!-- 当前评论项 -->
      <CommentItem :comment="presentComment"></CommentItem>
      <!-- 所有评论回复 -->
      <van-cell title="所有回复"></van-cell>
      <CommentList :articleId="presentComment.com_id" type="c"></CommentList>
      <!-- 底部 -->
      <div class="article_bottom">
        <van-button
        class="comment-btn"
        type="default"
        @click="onWriteComment"
        size="small">写评论</van-button>
      </div>
      <!-- 发布回复评论 -->
      <van-popup v-model="isPostShow" position="bottom">
          <PostComment
        :target="presentComment.com_id"
        :article-id="articleId"
        :list="commentList"
        @post-success="onPostSuccess"></PostComment>
      </van-popup>
  </div>
</template>
<script>
import PostComment from './post-comment.vue'
import CommentItem from './comment-item.vue'
import CommentList from './comment-list.vue'
export default {
  data () {
    return {
      isPostShow: false,
      commentList: [] // 评论的回复列表
    }
  },
  components: {
    CommentItem,
    CommentList,
    PostComment
  },
  props: {
    presentComment: {
      type: Object,
      default: () => {}
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    onWriteComment () {
      this.isPostShow = true
    },
    onPostSuccess (comment) {
      this.commentList.unshift(comment)
      this.presentComment.reply_count++
      this.isPostShow = false
    }
  }
}
</script>
<style lang="less" scoped>
.article_bottom {
     height: 44px;
     width: 100%;
     background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    .comment-btn {
        float: left;
        width: 100%;
        height: 100%;
    }
 }
</style>
