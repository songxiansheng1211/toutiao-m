<template>
  <div class="search_history_container">
    <van-cell
    title="历史记录"
    >
    <div>
      <van-icon v-if="isDeleteHis" name="delete-o" />
      <div v-else>
      <span>全部删除 </span>
      <span @click.native="!isDeleteHis">完成</span>
      </div>
    </div>
    </van-cell>
    <van-cell
    :title="item"
    v-for="(item,index) in searchText"
    :key="index"
    >
    <van-icon @click="deleteHistory(index)" name="close" />
    </van-cell>
  </div>
</template>
<script>
export default {
  name: 'SearchHistory',
  data () {
    return {
      isDeleteHis: true
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
    }
  }
}
</script>
<style lang="less" scoped>

</style>
