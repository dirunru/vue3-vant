import { getDicData } from '@/api'
import { defineStore } from 'pinia'
const cacheMap = {}

export const useSelectStore = defineStore('select', {
  state: () => {
    return {
      dicData: {}
    }
  },
  actions: {
    setDic(key, list) {
      this.dicData[key] = list
    },
    getDic(key) {
      if (this.dicData[key]) {
        return new Promise((resolve, reject) => {
          resolve(this.dicData[key])
        })
      } else {
        //添加接口并发缓存处理 11=>33=>22
        if ((cacheMap?.[key]?.length ?? 0) == 0) {
          console.log('11', 11)
          cacheMap[key] = []
          getDicData(key).then(res => {
            console.log('22', 22)
            const data = res
            while (cacheMap[key].length) {
              const list = data.map(item => ({
                value: item.key || item.code,
                label: item.value || item.name
              }))
              this.setDic(key, list)
              const resolve = cacheMap[key].shift()
              resolve[0](list)
            }
          })
        }
        console.log('33', 33)
        return new Promise((resolve, reject) => {
          cacheMap[key].push([resolve, reject])
        })
      }
    }
  }
})
