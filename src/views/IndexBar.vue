<template>
  <div class="layout">
    <div class="box"></div>
    <div class="content">
      <SIndexBar :distance-top="30">
        <template #content="slotProps">
          <div class="index-box">
            <h1>{{ slotProps.item.text }}</h1>
          </div>
        </template>
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
    margin: 0 12px;
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
      .index-box {
        width: 100%;
        height: 200px;
        background: #fff;
        margin-bottom: 10px;
        border-radius: 10px;
        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
        h1 {
          text-align: center;
          line-height: 200px;
        }
      }
    }
  }
</style>
