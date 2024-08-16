module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
      viewportHeight: 812, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
      unitPrecision: 2, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['.ignore', '.hairlines', '.el-table', '.van-nav-bar', '.custom-'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false, // 允许在媒体查询中转换`px`
      exclude: [/node_modules/] // 防止第三方组件因为vw适配变小
    },
    autoprefixer: {}
  }
};

// postcss-px2rem：将px单位转换为rem单位，可以根据页面的根元素大小进行适配。
// postcss-viewport-height-correction：修复移动设备在计算viewport高度时的一些问题，确保适配效果更准确。
// postcss-write-svg：将svg文件转换为css中的data URI，并省略引用svg文件的步骤，减少网络请求。
// postcss-preset-env：根据目标浏览器的兼容性要求，自动引入所需的Polyfill，提升代码的兼容性。
// "postcss-px2rem": "^0.3.0",
// "postcss-pxtorem": "^6.1.0",
// "px2rem-loader": "^0.1.9",
// module.exports = {
//   plugins: [
//     require("postcss-pxtorem")({
//       rootValue: 16, // 换算的基数
//       selectorBlackList: [],
//       propList: ["*"],
//     }),
//   ],
// };
