const Mock = require('mockjs')
//1. “/api/vip/get2”  是需要拦截的请求路径 2. ‘post’ 方法， 3. {}是返回的自定义数据
//  [mock文档](http://mockjs.com/examples.html#Array)
// {
//   data: {
//     code: "200",
//     "list|800": [
//       {
//         id: "@guid",
//         name: "@cname",
//         age: "@integer(18, 100)",
//         time: "@date",
//         email: "@email",
//         address: "@county(true)",
//         gender: "@boolean",
//       },
//     ],
//   },
// }
Mock.mock('/mock/banner', 'post', (option: any) => {
  let info = JSON.parse(option.body)
  console.log('option', info)
  let dataList  =  Mock.mock({
    'list|10': [{
      'raate|0-100': 1,
    }]
  })
  console.log('dataList', dataList)
  return {
    code: '200',
    message: 'success',
    data: dataList.list
  }
})
