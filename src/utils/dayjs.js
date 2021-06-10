// 初始化dayjs 相关配置
import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'
// 配置使用中文语言包
dayjs.extend(relativeTime)

dayjs.locale('zh-cn')

// 把处理相对时间的代码包装为全局过滤器
// 这样可以在任何模板使用
Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})
