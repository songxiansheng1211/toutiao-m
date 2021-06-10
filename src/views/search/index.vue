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
      <SearchHistory v-else :search-text="SearchHistories"></SearchHistory>
    </div>
</template>
<script>
import SearchSuggestion from './components/search-suggestion.vue'
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
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
  methods: {
    onSearch (searchText) {
      // console.log('1')
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
      this.isResultShow = true
    }
  }
}
</script>
<style scoped>

</style>
