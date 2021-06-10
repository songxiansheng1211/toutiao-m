<template>
    <div class="channel-edit-container">
<van-cell center :border="false">
    <div slot="title" class="channel-title">我的频道</div>
    <van-button
    class="van-btn-width"
    type="danger"
    plain
    round
    size="mini"
    @click="isEdit = !isEdit"
    >
    {{isEdit ? '完成' : '编辑'}}</van-button>
</van-cell>
<van-grid :gutter="10">
    <!-- 标签的高亮选中效果 判断条件如果索引 等于现在active -->
  <van-grid-item
  class="grid-item"
  :class="{ active : index === nowActive }"
  v-for="(value,index) in userChannel"
  :key="value.id"
  :icon="isEdit ? 'clear' : ''"
  :text="value.name"
  @click="onEdit(value,index)"
  />
</van-grid>

<van-cell center :border="false">
    <div slot="title" class="channel-title">频道推荐</div>
</van-cell>
<van-grid :gutter="10">
  <van-grid-item
  class="grid-item"
  v-for="(value,index) in recommendChannel"
  :key="index"
  :text="value.name"
  @click="onAdd(value)"
  />
</van-grid>
    </div>
</template>
<script>
import { getAllArticles, addUserChannel, deleteUserChannel } from '@/api/article'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'channelEdit',
  data () {
    return {
      allChannel: [],
      isEdit: false
    }
  },
  props: {
    userChannel: {
      type: Array,
      required: true
    },
    nowActive: {
      type: Number,
      required: true
    }
  },
  created () {
    this.getAllArticlesList()
  },
  computed: {
    ...mapState(['user']),
    //  推荐频道列表
    recommendChannel () {
    // filter根据方法返回的 布尔值 true 来(收集)数据 查找满足条件的所以元素
      return this.allChannel.filter(item => {
        return !this.userChannel.find(value => {
        // 查找满足条件的单个元素
          return item.id === value.id
        })
      })
    }
  },
  methods: {
    async getAllArticlesList () {
      const { data } = await getAllArticles()
      this.allChannel = data.data.channels
    },
    async onAdd (channel) {
      // 在改变推荐频道的同时 会触发计算属性（依赖数据的变化而变化）
      this.userChannel.push(channel)
      // 数据持久化
      if (this.user) {
        // 如果登录 将数据保存在后台
        await addUserChannel({
          channels: [
            { id: channel.id, seq: this.userChannel.length }
          ]
        })
      } else {
        // 没有登录数据存储到 本地
        setItem('user-channels', this.userChannel)
      }
    },
    onEdit (value, index) {
      if (this.isEdit === true) {
        this.deleteChannel(value, index)
      } else {
        this.switchChannel(index)
      }
    },
    async deleteChannel (value, index) {
      // 如果删除的是 当前高亮之前的 当前的 nowActive 会发生变化
      if (index < this.nowActive) {
        this.$emit('updata-active')
      }
      this.userChannel.splice(index, 1)
      // 删除的持久化
      if (this.user) {
        await deleteUserChannel(value.id)
      } else {
        setItem('user-channels', this.userChannel)
      }
    },
    switchChannel (index) {
      this.$emit('close', index)
    }
  }
}
</script>
<style lang="less" scoped>
.channel-edit-container {
    padding-top: 54px;
    .channel-title {
        font-size: 16px;
        color: #333;
    }
    .grid-item {
        width: 80px;
        height: 43px;
    /deep/.van-grid-item__content {
        background-color: #f4f5f6;
        position: relative;
       .van-grid-item__icon {
            position: absolute;
            right: -7px;
            top: -7px;
            font-size: 16px;
            color: #ccc;
       }
        .van-grid-item__text {
            font-size: 14px;
            color: #222;
            margin-top: unset;
        }
       }

    }
    .van-btn-width {
      width: 50px;
    }
    .active {
     /deep/ .van-grid-item__text{
        color: red  !important;
        }
    }
}
</style>
