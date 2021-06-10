<template>
    <div class="home_container">
      <van-cell-group v-if="user" class="my-info">
        <van-cell class="base-info"  center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="currentUser.photo"
          />
          <div slot="title" class="name">{{currentUser.name}}</div>
          <van-button size="mini" round class="update-btn">编辑资料</van-button>
        </van-cell>
        <van-grid class="data-info" :border="false">
        <van-grid-item class="data-info-item">
          <div class="text-warp" slot="text">
            <div class="count">{{currentUser.art_count}}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-warp" slot="text">
            <div class="count">{{currentUser.follow_count}}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-warp" slot="text">
          <div class="count">{{currentUser.fans_count}}</div>
          <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <div class="text-warp" slot="text">
          <div class="count">{{currentUser.like_count}}</div>
          <div class="text">获赞</div>
          </div>
        </van-grid-item>
        </van-grid>
      </van-cell-group>
      <!-- 未登录样式 -->
      <div v-else class="no-login">
        <div class="mobile-login" @click="$router.push('/login')"></div>
        <div  class="text-login">登录 / 注册</div>
      </div>
      <van-grid :column-num="2" class="nav-grid mb-5">
        <van-grid-item class="nav-grid-item" icon-prefix="toutiao" icon="shoucang" text="收藏" />
        <van-grid-item  class="nav-grid-item" icon-prefix="toutiao" icon="lishi" text="历史" />
      </van-grid>
      <van-cell title="消息通知" is-link to="" />
      <van-cell title="小智同学" is-link to="" class="mb-5"/>
      <van-cell v-if="user" title="退出登录" class="logOut" @click="onLogOout"/>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { getCurrentUser } from '@/api/user'
export default {
  name: 'myIndex',
  data () {
    return {
      // 当前登录用户信息
      currentUser: {

      }
    }
  },
  computed: {
    // 把容器里的数据映射到本地
    ...mapState(['user'])
  },
  created () {
    this.loadCurrentUser()
  },
  methods: {
    async loadCurrentUser () {
      const { data } = await getCurrentUser()
      console.log(data)
      this.currentUser = data.data
    },
    onLogOout () {
      this.$dialog.confirm({
        title: '退出提示',
        message: '确认退出吗？'
      })
        .then(() => {
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>
<style lang="less" scoped>
 .my-info {
   background: url("./banner.png") no-repeat;
   background-size: cover;
   .base-info {
      box-sizing: border-box;
      height: 115px;
      background-color: unset;
      padding-top: 38px;
      padding-bottom: 11px;
      .avatar {
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
        margin-right: 11px;
      }
      .name {
        color: #ccc;
        font-size: 15px;
      }
      .update-btn {
        height: 16px;
        font-size: 10px;
        color: #666;
      }
   }
   .data-info {
     .data-info-item {
        height: 65px;
        // color: #fff;
        .text-warp {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        .count {
          font-size: 18px;
        }
        .text {
          font-size: 12px;
        }

        }
     }
   }
  //  /deep/ 深度作用操作符 也可以写成 >>>（像sass这样的可能没法解析>>>）
   /deep/ .van-grid-item__content {
      background-color: unset;
   }
 }
//  收藏、历史
 /deep/ .nav-grid {
  .nav-grid-item {
    height: 70px;
    .toutiao {
      font-size: 22px;
    }
    .toutiao-shoucang {
      color: #eb5253;
    }
    .toutiao-lishi {
      color: #ff9d1d;
    }
    .van-grid-item__text {
      font-size: 14px;
      color: #333;
    }
  }
}

.logOut {
  // .van-cell__title {
    text-align: center;
    color: #d86262;
  // }
}

.mb-5 {
  margin-bottom: 5px;
}
.no-login {
 height: 180px;
 background: url('./banner.png') no-repeat;
 background-size: cover;
 display: flex;
 justify-content: center;
 flex-direction: column;
 align-items: center;
.mobile-login {
  width: 66px;
  height: 66px;
  background: url('./mobile.png') no-repeat;
  background-size: cover;
  border-radius: 50%;
}
.text-login {
 font-size: 14px;
 color: #ccc;
}

}

</style>
