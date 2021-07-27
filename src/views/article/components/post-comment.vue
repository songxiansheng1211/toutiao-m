<template>
<!-- 发布评论 -->
  <div class="post-comment">
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入评论"
      show-word-limit
    />
    <!-- 禁用状态没有字符 空格之类都不行 trim() -->
    <van-button class="post-btn" @click="onPost" :disabled="!message.trim()">发布</van-button>
  </div>
</template>
<script>
import { addComment } from '@/api/comment.js'
export default {
  data () {
    return {
      message: ''
    }
  },
  props: {
    target: {
      // 防止引发props校验设置多类型
      type: [String, Object, Number],
      required: true
    },
    articleId: {
      type: [String, Object, Number],
      default: null
    }
  },
  methods: {
    async onPost () {
      this.$toast.loading({
        message: '发布中',
        forbidClick: true
      })
      const { data } = await addComment({
        target: this.target.toString(),
        content: this.message,
        art_id: this.articleId === null ? null : this.articleId.toString()
      })
      this.$emit('post-success', data.data.new_obj)
      this.$toast.success('发布成功')
      this.message = ''
    }
  }
}
</script>
<style lang="less" scoped>
.post-comment {
    padding: 14px;
    display: flex;
    align-items: center;
}
.post-btn {
    width: 68px;
    border: unset;
}
</style>
