<template>
    <van-cell class="article_item">
        <div slot="title" class="title van-multi-ellipsis--l3">{{article.title}}</div>
        <div slot="label">
            <div class="cover-warp" v-if="article.cover.type === 3">
                <div class="cover-warp-item" v-for="(item,index) in article.cover.images" :key="index">
                <van-image
                    class="cover-item"
                    fit="cover"
                    :src="item"
                />
                </div>
            </div>
            <div class="label-warp">
            <span>{{article.aut_name}}</span>
            <span> {{article.comm_count}}评论</span>
            <span> {{article.pubdate | relativeTime}}</span>
            </div>
        </div>
        <!-- 一个封面 -->
        <van-image
          v-if="article.cover.type === 1"
          class="right"
          fit="cover"
          :src="article.cover.images[0]"
        />
    </van-cell>
</template>
<script>
export default {
  name: 'articleItem',
  data () {
    return {}
  },
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  components: {},
  methods: {}
}
</script>
<style lang="less" scoped>
.article_item {
  .title {
     font-size: 16px;
     color: #3a3a3a;
  }
  /deep/.van-cell__value {
      flex: unset;
      width: 116px;
      height: 73px;
      margin-left: 12px;
  }
  .right {
      width: 116px;
      height: 73px;
  }
  .cover-warp {
    display: flex;
    padding: 15px 0;
    .cover-warp-item {
        height: 73px;
        flex: 1;
        &:not(:last-child) {
          padding-right: 4px;
        }
        .cover-item {
          width: 100%;
          height: 73px;
        }
    }
  }
  .label-warp {
    font-size: 11px;
    color: #b4b4b4;
  }
  .label-warp span {
    margin-right: 12px;
  }
}
</style>
