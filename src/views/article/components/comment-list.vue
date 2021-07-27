<template>
  <div class="comment-list">
    <van-cell title="全部评论"></van-cell>
    <van-list
  v-model="loading"
  :finished="finished"
  finished-text="评论到头了，还不赶紧发言"
  @load="onLoad"
>
  <commentItem v-for="(item,index) in list" :key="index" :comment="item" @reply-click="$emit('reply-click', $event)"></commentItem>
</van-list>
  </div>
</template>
<script>
import { getArticleComments } from '@/api/comment.js'
import commentItem from './comment-item.vue'
export default {
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10
    }
  },
  components: {
    commentItem
  },
  props: {
    articleId: {
      type: [String, Object, Number],
      required: true
    },
    type: {
      type: String,
      default: 'a'
    },
    list: {
      type: Array,
      // 数组或对象的默认值必须通过函数返回
      default: () => []
    }
  },
  methods: {
    async onLoad () {
      // 请求数据
      const { data } = await getArticleComments({
        type: this.type,
        source: this.articleId.toString(),
        offset: this.offset,
        limit: this.limit
      })
      this.$emit('totalCount', data.data.total_count)
      // console.log(data)
      // 数据放入列表中
      const { results } = data.data
      this.list.push(...results)
      // 将本次loading 关闭
      this.loading = false
      // 判断是否还有数据
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        // 没有数据 finished
        this.finished = true
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
