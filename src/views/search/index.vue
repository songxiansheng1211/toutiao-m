<template>
    <div class="search_container">
      <!-- 搜索栏 -->
      <!-- 外层包裹 form 并action不为空 ios 安卓输入键盘显示搜索按钮 -->
      <form action="/">
        <van-search
          v-model="searchText"
          background="#6db4fb"
          @search="onSearch(searchText)"
          @cancel="$router.back()"
          @focus="isResultShow = false"
          show-action
          placeholder="请输入搜索关键词" />
      </form>
      <!--搜索结果-->
      <SearchResult v-if="isResultShow" :search-text="searchText"></SearchResult>
      <!-- 联想建议 -->
      <SearchSuggestion v-else-if="searchText" :search-text="searchText" @search="onSearch"></SearchSuggestion>
      <!-- 历史记录 -->
      <SearchHistory
        v-else
        :search-text="SearchHistories"
        @search="onSearch"
        @update-history="SearchHistories = $event"
       ></SearchHistory>
    </div>
</template>
<script>
import SearchSuggestion from './components/search-suggestion.vue'
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import { setItem, getItem } from '@/utils/storage'
// import { getSearchHis } from '@/api/search.js'
import { mapState } from 'vuex'
export default {
  name: 'searchIndex',
  data () {
    return {
      searchText: '',
      isResultShow: false,
      SearchHistories: []
    }
  },
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult
  },
  watch: {
    SearchHistories () {
      // 监视搜索历史记录的变化，存储到本地存储
      setItem('search-histories', this.SearchHistories)
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onSearch (searchText) {
      // 输入设置成要搜索的文本
      this.searchText = searchText
      // 新查看的内容查看历史记录里面的内容是否重复
      const index = this.SearchHistories.indexOf(searchText)
      if (index !== -1) {
        // 重复 删除之前的
        this.SearchHistories.splice(index, 1)
      }
      // 再往数组里的头部添加新内容
      this.SearchHistories.unshift(searchText)
      // 已登录状态 后端会自动把历史记录存储到线上
      // 没有登录 则把搜索历史记录保存到 本地
      // setItem('search-histories', this.SearchHistories)
      // 展示搜索结果
      this.isResultShow = true
    },
    async loadSearchHis () {
      const localHis = getItem('search-histories') || []
      // if (this.user) {
      //   const { data } = await getSearchHis()
      //   // set 接收一个数组 返回的是没有重复的数组项的set数据结构再把set用数组包裹起来转为数组  可以实现数组的去重
      //   localHis = [...new Set([...localHis, ...data.data.keywords])]
      // }
      this.SearchHistories = localHis
    }
  }
}
</script>
<style scoped>

</style>
