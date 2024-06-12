module.exports = {
  plugins: {
    "postcss-px-to-viewport": {
      viewportWidth: 375, // 设计稿宽度
      viewportUnit: "vw", // 希望使用的视窗单位
      selectorBlackList: [".ignore", ".hAIrlines"], // 不转换的类名
      minPixelValue: 1, // 最小的转换数值
      mediaQuery: false, // 是否允许在媒体查询中转换px
    },
  },
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
