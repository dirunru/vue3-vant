const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const resolve = (dir) => {
  return path.join(__dirname, dir);
};
module.exports = defineConfig({
  transpileDependencies: true,
  assetsDir: "static",
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.plugin("define").tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: "true",
        __VUE_PROD_DEVTOOLS__: "false",
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false",
      });
      return definitions;
    });
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"));
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      config.mode = "production";
      config["performance"] = {
        //打包文件大小配置
        maxEntrypointSize: 10000000,
        maxAssetSize: 30000000,
      };
    }
  },
  // devServer: {
  //   host: "localhost",
  //   port: 3000, // 启动端口号
  //   proxy: {
  //     "/api": {
  //       // 请求接口中要替换的标识
  //       target: "http://117.62.22.235:17009", // 代理地址
  //       ChangeOrigin: true, // 是否允许跨域
  //       secure: true,
  //       pathRewrite: {
  //         "^/api": "", // 这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
  //       },
  //     },
  //   },
  // },
});
