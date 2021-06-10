import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)
const USER_KEY = 'toutiao-user'
export default new Vuex.Store({
  state: {
    // 当前用户登录的状态
    // user: JSON.parse(window.localStorage.getItem('user'))
    user: getItem(USER_KEY)
  },
  mutations: {
    // 为了token数据的持久化 我们还需要把数据放到本地存储
    setUser (state, data) {
      state.user = data
      // window.localStorage.setItem('user', JSON.stringify(state.user))
      setItem(USER_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
