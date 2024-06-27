import requests from '../utils/mockRequests'
import '../mock/user'

export const reqGetBannerList = (data:Object) => {
  return new Promise((resolve, reject) => {
    requests({
      url: '/banner',
      method: 'post',
      data
    }).then((res:any) => {
      if (res.data.code === '200') {
        console.log('res.data', res.data)
        resolve(res.data)
      } else {
        reject(res.data)
      }
    })
  })
}
