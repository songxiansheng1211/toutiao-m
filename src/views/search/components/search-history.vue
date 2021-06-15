<template>
  <div class="search_history_container">
    <van-cell
    title="历史记录"
    >
    <div>
      <div v-if="isDeleteHis">
        <!-- prop 数据如果是引用类型可以修改（数组，对象）
        注意这个修改是指的是： user.name = 'sh' arr.push(123) arr.splice(0,1)
        但是任何 prop数据都不能重新赋值： xxx = xxx
        如果想让 prop数据 = 新的数据 让父组件自己修改-->
      <span @click="$emit('update-history', [])">全部删除 </span>
      <span @click="isDeleteHis = false">完成</span>
      </div>
      <van-icon v-else @click="isDeleteHis = true" name="delete-o" />
    </div>
    </van-cell>
    <van-cell
    :title="item"
    v-for="(item,index) in searchText"
    :key="index"
    @click="hisSearch(item)"
    >
    <van-icon v-show="isDeleteHis" @click="deleteHistory(index)" name="close" />
    </van-cell>
  </div>
</template>
<script>
// 父组件里 watch监视了
// import { setItem } from '@/utils/storage.js'
export default {
  name: 'SearchHistory',
  data () {
    return {
      isDeleteHis: false
    }
  },
  props: {
    searchText: {
      type: Array,
      required: true
    }
  },
  methods: {
    deleteHistory (index) {
      this.searchText.splice(index, 1)
      // setItem('search-histories', this.searchText)
    },
    hisSearch (item) {
      if (this.isDeleteHis !== true) {
        return this.$emit('search', item)
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
