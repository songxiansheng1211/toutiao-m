<template>
  <div class="article-list">
    <van-pull-refresh v-model="isPullDownLoading" @refresh="onRefresh" :success-text="refreshSuccessText" :success-duration="1500">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell v-for="(item,index) in articles" :key="index" :title="item.title" /> -->
        <ArticleItem v-for="(item,index) in articles" :key="index" :article="item"></ArticleItem>
      </van-list>
    </van-pull-refresh>

  </div>
</template>
<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'articleList',
  data () {
    return {
      articles: [], // 数据列表
      loading: false,
      finished: false,
      timestamp: null, // 获取下一页时间戳
      isPullDownLoading: false, // 下拉刷新的状态
      refreshSuccessText: '' // 下拉刷新提示文字
    }
  },
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      const { results } = data.data
      this.articles.push(...results)
      //   data.data.results.forEach(item => {
      //     this.articles.push(item)
      //   })
      // console.log(this.articles)
      // console.log(results)
      this.loading = false
      if (results.length) {
        //   更新下一页数据的页码
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    async onRefresh () {
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      const results = data.data.results
      //   console.log(results)
      this.articles.unshift(...results)
      this.isPullDownLoading = false
      this.refreshSuccessText = `更新了${results.length}条数据`
    }
  }
}
</script>
<style lang="less" scoped>
.article-list {
    // 固定定位解决 加载更多被挡住和内容滚动不会把上方内容带走
    position: fixed;
    top: 90px;
    left: 0;
    right: 0;
    bottom: 50px;
    // 滚动条
    overflow-y: auto ;
}
</style>
