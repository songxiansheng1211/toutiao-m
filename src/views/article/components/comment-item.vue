<template>
  <van-cell class="comment-item">
      <van-image
        slot="icon"
        round
        class="avatar"
        fit="cover"
        :src="comment.aut_photo"
      />
      <div slot="title">
      <div class="name-like">
        <div class="name">{{comment.aut_name}}</div>
        <div class="like-warp" @click="onLike">
        <van-icon
        class="like-icon"
        :name="comment.is_liking ? 'good-job': 'good-job-o'"
        :color="comment.is_liking ? 'hotpink' : '#000'"
        />
        <span class="like-count">{{comment.like_count}}</span>
      </div>
       </div>
          <div class="content">{{comment.content}}</div>
          <div class="time-reply">
              <span class="pubdate">{{comment.pubdate | dataTime('MM-DD HH:mm')}}</span>
              <van-button class="reply-btn" round size="mini" @click="$emit('reply-click', comment)">{{comment.reply_count}}回复</van-button>
          </div>
      </div>
  </van-cell>
</template>
<script>
import { cancelLikeComment, likeComment } from '@/api/comment.js'
export default {
  name: 'commentItem',
  data () {
    return {
    }
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  methods: {
    async onLike () {
      const commentId = this.comment.com_id.toString()
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true // 禁止背景点击
      })
      if (this.comment.is_liking) {
        await cancelLikeComment(commentId)
        this.comment.like_count--
      } else {
        await likeComment(commentId)
        this.comment.like_count++
      }
      this.$toast.success(`${this.comment.is_liking ? '取消' : ''}点赞成功`)
      this.comment.is_liking = !this.comment.is_liking
    }
  }
}
</script>
<style lang="less" scoped>
.comment-item {
  .avatar {
   width: 36px;
   height: 36px;
  }
  .name-like {
      display: flex;
      justify-content: space-between;
    .name {
      font-size: 14px;
      color: #406599;
      margin-left: 13px;
    }
    .like-warp {
      .like-icon {
       font-size: 12px;
      }
    }
  }
  .content {
      font-size: 16px;
      color: #222;
      margin-left: 13px;
  }
  .time-reply {
      display: flex;
     .pubdate {
      font-size: 10px;
      margin-left: 13px;
      margin-right: 10px;
  }
  .reply-btn {
      width: 66px;
      height: 24px;
  }
  }
}
</style>
