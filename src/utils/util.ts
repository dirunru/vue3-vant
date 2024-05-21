export const batchImportPictures = () =>{
  const req = require.context('./assets/img/icon', false, /\.png$/)
  let imagesNameArr = [];
  let imageArr = []
  for (var j = 0; j < req.keys().length; j++) {
    // 将图片的名字从第二位开始抽取赋值到imagesNameArr
    imagesNameArr.push(req.keys()[j].substr(2, req.keys()[j].length));
    // 定义对象，存放图片的名称和路径
    let value = {
      name: '',
      url: ''
    }
    // 将图片的名称和url传入value对象
    value.name = imagesNameArr[j].substring(0,imagesNameArr[j].length-length);
    value.url = './assets/img/icon' + imagesNameArr[j];
    // 将value对象传入data中
    imageArr.push(value)
  }
}