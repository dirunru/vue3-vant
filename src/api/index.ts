import requests from '../utils/mockRequests'
import '../mock/user'

export const reqGetBannerList = (data:Object) => {
  return new Promise((resolve, reject) => {
    requests.service({
      url: '/banner',
      method: 'post',
      data
    }).then((res:any) => {
      resolve(res.data)
    })
  })
}
