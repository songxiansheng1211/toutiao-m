<template>
  <!-- 联想建议 -->
  <div class="search_suggestion_container">
    <!-- 将联想的内容传给父组件 父组件接收到参数后 调用onsearch方法-->
    <van-cell
      v-for="(item, index) in searchSuggestionsData"
      :key="index"
      icon="search"
      @click="$emit('search',item)"
    >
    <div slot="title" v-html="highLight(item)"></div>
    </van-cell>
  </div>
</template>
<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  data () {
    return {
      searchSuggestionsData: []
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    // 属性名：要监视的数据
    // 上面的写法 等价于下面的写法 下面的写法更完整 可以进行更多操作
    // searchText () {
    //   console.log('123')
    // }
    searchText: {
      // 数据发生变化触发 handler处理函数
      //  debounce函数防抖处理
      handler: debounce(function () {
        //  监视数据调用接口
        getSearchSuggestions(this.searchText).then(res => {
          this.searchSuggestionsData = res.data.data.options
        })
      }, 200),
      immediate: true
    }
  },
  methods: {
    // 处理搜索字符 高亮效果
    highLight (item) {
      // RegExp 正则表达式构造函数
      // 参数1 字符串  参数2 匹配模式  返回值 正则对象
      const replaceObj = new RegExp(this.searchText, 'gi')
      const highLightText = `<span style="color:red;">${this.searchText}</span>`
      return item.replace(replaceObj, highLightText)
    }
  }
}
</script>
<style lang="less" scoped></style>
