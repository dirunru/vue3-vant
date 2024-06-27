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
        //添加接口并发缓存处理
        if ((cacheMap?.[key]?.length ?? 0) == 0) {
          cacheMap[key] = []
          getDicData(key).then(res => {
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
        return new Promise((resolve, reject) => {
          cacheMap[key].push([resolve, reject])
        })
      }
    }
  }
})
