// postcss.config.js
// 行内样式不转换
module.exports = {
  plugins: {
    // 把px转换成 rem
    'postcss-pxtorem': {
      // 转换根元素基准值
      // 正常是按照设计稿来， 750 /10 = 75  375 / 10 =37.5
      // 此开发设计稿为750 vant适应37.5 所以使用 37.5但设计稿测量的除以2
      rootValue: 37.5,
      // 需要转换的列表 *全部
      propList: ['*']
    }
  }
}
