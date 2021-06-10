<template>
    <div class="login_container">
      <!-- navBar -->
    <van-nav-bar
  title="登录"
  left-arrow
  @click-left="$router.back()"
  class="app-nav-bar"
/>
<!-- 登录输入框 -->
<van-form @submit="onLogin" :show-error="false" :show-error-message="false" @failed="onFailed" validate-first ref="formRef">
  <van-field
    v-model="user.mobile"
    icon-prefix="toutiao"
    left-icon="shouji"
    placeholder="请输入手机号"
    name="mobile"
    :rules="formRules.mobile"
    center
  />
  <van-field
    v-model="user.code"
    clearable
    icon-prefix="toutiao"
    left-icon="yanzhengma"
    placeholder="请输入验证码"
    name="code"
    :rules="formRules.code"
    center
  >
    <template #button>
      <!-- 在表单内的按钮都会触发提交事件 所以在不需要的地方添加prevent-->
      <!-- 倒计时 time时间，format格式 finish倒计时结束事件-->
    <van-count-down v-if="isCountDownShow" :time="1000 * 60" format="ss s" @finish="isCountDownShow = false"/>
    <van-button v-else size="small" round class="send-btn" @click.prevent="onSendSms" :loading="isSendSmsLoading">发送验证码</van-button>
  </template>
  </van-field>
  <!-- 登录按钮 -->
<div class="login-btn-warp">
<van-button type="info" class="login-btn" block>登录</van-button>
</div>
</van-form>
    </div>
</template>
<script>
import { login, sendSms } from '@/api/user.js'
// import { Toast } from 'vant'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13922222222',
        code: '246810'
      },
      formRules: {
        mobile: [{ required: true, message: '请输入手机号 ' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入有效的手机号' }],
        code: [{ required: true, message: '请输入验证码 ' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }]
      },
      // 控制倒计时和发送按钮显示状态
      isCountDownShow: false,
      isSendSmsLoading: false
    }
  },
  methods: {
    // 登录
    async onLogin () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 展示时长
      })
      try {
        const res = await login(this.user)
        console.log(res)
        this.$toast.success('登录成功')
        this.$store.commit('setUser', res.data.data)
        // 登录成功跳转回原来页面
        this.$router.back() // 先用这种方式 有缺点
      } catch (err) {
        this.$toast.fail('登录失败')
      }
    },
    // 校验不通过时信息提示
    onFailed (error) {
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message,
          position: 'top'
        })
      }
    },
    // 发送验证码
    async onSendSms () {
      try {
        await this.$refs.formRef.validate('mobile')
        this.isSendSmsLoading = true
        await sendSms(this.user.mobile)
        this.isCountDownShow = true
      } catch (err) {
        let message = ''
        if (err && err.response && err.response.status === 429) {
          message = '发送太频繁'
        } else if (err.name === 'mobile') {
          message = err.message
        } else {
          message = '发送失败，稍后重试'
        }
        this.$toast({
          message,
          position: 'top'
        })
      }
      this.isSendSmsLoading = false
    }
  }
}
</script>
<style lang="less">
.login_container {
  .login-btn-warp {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
  .send-btn {
    width: 80px;
    height: 25px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666666;
    }
  }
}
</style>
