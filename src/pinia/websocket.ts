import { defineStore } from 'pinia'

export const useSelectStore  = defineStore('socketStore', {
  state:()=> {
    return {
      isConnected: false,//连接状态
    }
  },
  actions: {
    setConnected(isConnected: boolean) {
      this.isConnected = isConnected
    },
    connect() {
      // 连接成功后，将 isConnected 状态设置为 true
      this.setConnected(true)
    },
    disconnect() {
      // 断开连接或退出登录时，将 isConnected 状态设置为 false
      this.setConnected(false)
    }
  }
})
