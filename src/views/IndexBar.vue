<template>
  <div class="layout">
    <div class="box"></div>
    <div class="content">
      <SIndexBar :distance-top="30">
        <!-- <template #content>
          
        </template> -->
      </SIndexBar>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue';
  import SIndexBar from '@/components/SIndexBar.vue';
</script>
<style lang="less" scoped>
  .layout {
    display: flex;
    flex-direction: column;
    .box {
      position: fixed;
      top: 0;
      height: 30px;
      width: 100%;
      background: #fff;
      border-radius: 10px;
      opacity: 0.7;
    }
    .content {
      margin-top: 30px;
      height: calc(100vh - 30px);
      overflow: auto;
    }
  }
</style>
