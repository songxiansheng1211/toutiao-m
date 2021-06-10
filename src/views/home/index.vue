<template>
    <div class="home_container">
      <!-- 导航navBar -->
      <van-nav-bar
      class="app-nav-bar">
      <van-button slot="title" icon="search" type="info" round size="small" class="search-btn" to="/search">搜索</van-button>
      </van-nav-bar>
      <!-- 文章频道列表 -->
      <!-- 标签页有一个功能 只有第一次查看时才会渲染里面的内容 -->
      <van-tabs v-model="active" class="channel-tabs">
        <van-tab :title="item.name" v-for="item in channelsData" :key="item.id">
          <!-- 看谁就会渲染谁相应的内容 -->
          <ArticleList :channel="item"></ArticleList>
        </van-tab>
        <!-- 最后一个占位的元素 -->
        <div class="excess-space" slot="nav-right"></div>
        <div slot="nav-right" @click="isChannelEditShow = true" class="wap-nav-warp">
        <van-icon name="wap-nav" />
        </div>
      </van-tabs>
      <van-popup
      class="channel-edit-popup"
        v-model="isChannelEditShow"
        position="bottom"
        closeable
        close-icon-position="top-left"
        get-container="body"
      >
      <!-- 模板中的 $event 表示事件参数 例如： updata-active = "active = $event" -->
      <ChannelEdit :user-channel="channelsData" @close="closed" :nowActive="active" @updata-active="nowActive"></ChannelEdit>
      </van-popup>
    </div>
</template>
<script>
import ChannelEdit from './components/channel-edit'
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage.js'
export default {
  name: 'homeIndex',
  data () {
    return {
      active: 0, // 控制被激活的标签
      channelsData: [],
      isChannelEditShow: false // 控制编辑显示状态
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      let channels = []
      // this.channelsData = data.data.channels
      if (this.user) {
        // 已登录 请求线上的用户频道列表数据
        const { data } = await getUserChannels()
        channels = data.data.channels
      } else {
        // 没有登录判断是否有本地存储的频道列表数据
        const localChannels = getItem('user-channels')
        if (localChannels) {
          // 如果有本地存储列表
          channels = localChannels
        } else {
          // 如果没有请求获取默认推荐频道列表(不带有token)
          const { data } = await getUserChannels()
          channels = data.data.channels
        }
      }
      this.channelsData = channels
    },
    closed (index) {
      this.isChannelEditShow = false
      this.active = index
    },
    nowActive () {
      // 删除当前高亮之前的 nowAcitve不变所以此处高亮的索引要减一
      this.active = this.active - 1
    }
  }
}
</script>
<style lang="less" scoped>
.home_container {
.search-btn {
  width: 277px;
  height: 32px;
  background-color: #5babfb;
  border: none;
  .van-button__text {
    font-size: 14px;
  }
  .van-button__icon {
    font-size: 16px;
  }
}
/deep/ .van-nav-bar__title {
 max-width: none;
}
 /deep/.channel-tabs {
   .van-tabs__line {
     bottom: 20px;
     background-color: #3296fa;
     width: 15px;
     height: 3px;
   }
  .van-tab {
    border-right: 1px solid #edeff3;
    border-bottom: 1px solid #edeff3;

  }
.excess-space {
  width: 33px;
  // 之前内容用flex布局参与平分 此处的 flex-shrink设置不参与平分
  flex-shrink: 0;
}
}
.wap-nav-warp {
  position: fixed;
  right: 0;
  height: 43px;
  // line-height: 44px;
  background-color: #fff;
  opacity: 0.9;
  width: 33px;
  display: flex;
  justify-content: center;
  align-items: center;
  .van-icon {
    font-size: 22px;
  }
}
}
  .channel-edit-popup {
    height: 100%;
  }

</style>
