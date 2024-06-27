const Mock = require("mockjs");
//1. “/api/vip/get2”  是需要拦截的请求路径 2. ‘post’ 方法， 3. {}是返回的自定义数据
//  [mock文档](http://mockjs.com/examples.html#Array)
Mock.mock("/mock/banner", "post", {
  data: {
    code: "200",
    "list|800": [
      {
        id: "@guid",
        name: "@cname",
        age: "@integer(18, 100)",
        time: "@date",
        email: "@email",
        address: "@county(true)",
        gender: "@boolean",
      },
    ],
  },
});
