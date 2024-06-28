<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { closeWebSocket, initWebSocket } from '@/utils/websocket'
  import { useSelectStore } from '@/pinia/websocket'
  const socketStore = useSelectStore()
  //连接设备  （具体路径和后端规定）
  function connectMsg() {
    const toIp = `ws://192.168.50.50:8822/websocket/ipad/${12}`
    socketStore.connect()
    initWebSocket(toIp)
  }

  // 设备断开
  function closeWs() {
    closeWebSocket()
    socketStore.disconnect()
  }
</script>
<template>
  <div class="connect">
    <el-button class="elbtn" @click="connectMsg">连接设备</el-button>
    <el-button class="elbtn" @click="closeWs">关闭设备</el-button>
  </div>
</template>
