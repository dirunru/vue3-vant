// 批量导出图片
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

  // 处理列合并的数组
  export const getSpanArr = (data:[], key:string) => {
    // console.log("data", data);
    let spanArr = [];
    let pos = 0;
    for (let i = 0; i < data.length; i++) {
      if (i === 0) {
        spanArr.push(1);
        pos = 0;
      } else {
        // 判断当前元素与上一个元素是否相同
        if (data[i][key] === data[i - 1][key]) {
          // 如果相同就将索引为 pos 的值加一
          spanArr[pos] += 1;
          // 且将数组添加 0
          spanArr.push(0);
        } else {
          // 如果元素不同了，就可以通过索引为 pos 的值知晓应该需要合并的行数
          // 同时，我们再次添加一个值1，表示重新开始判断重复姓名的次数
          spanArr.push(1);
          // 同时 索引加一
          pos = i;
        }
      }
    }
    return spanArr;
  };
/**
 * 移除空值
 * @param {*} Object
 * @returns
 */

export const removeEmptyValues = (obj:any) => {
  for (const key in obj) {
    if (obj[key] === '' || obj[key] === null || obj[key] === undefined) {
      delete obj[key]
    } else if (typeof obj[key] === 'object' && Object.keys(obj[key]).length === 0) {
      delete obj[key]
    }
  }
  return obj
}
