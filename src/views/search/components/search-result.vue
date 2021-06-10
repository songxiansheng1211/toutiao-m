<template>
  <div class="search_result_container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>
<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      prePage: 10
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  methods: {
    async onLoad () {
      // 1.请求数据  2.数据放入列表  3.关闭loading  4.判断是否还有数据  5. finished
      this.loading = true
      const { data } = await getSearchResult({
        page: this.page,
        pre_page: this.prePage,
        q: this.searchText
      })
      const { results } = data.data
      this.list.push(...results)
      this.loading = false
      if (results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>
<style lang="less" scoped>
.search_result_container {
  position: fixed;
  left: 0;
  right: 0;
  top: 54px;
  bottom: 0;
  // 内部产生滚动条
  overflow-y: auto;
}
</style>
