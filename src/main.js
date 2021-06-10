import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载vant 组件库
import Vant from 'vant'
import 'vant/lib/index.css'
// 动态设置REM基准值
import 'amfe-flexible'
import '../src/style/index.less'
import './utils/dayjs'

// 全局注册vant组件
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
