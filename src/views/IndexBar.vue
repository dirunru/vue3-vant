<template>
  <div class="layout">
    <div class="box"></div>
    <div class="content">
      <SIndexBar :indexList="indexList">
        <template v-for="item in indexList" :key="item.index">
          <SIndexAnchor :index="item.index">
            <h5>{{ item.index + ':' + item.text }}</h5>
          </SIndexAnchor>
          <h1>{{ item.text }}</h1>
        </template>
      </SIndexBar>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue';
  import SIndexBar from '@/components/SIndexBar';
  import SIndexAnchor from '@/components/SIndexAnchor';
  const indexList = [
    {
      text: 'A',
      index: '1'
    },
    {
      text: 'B',
      index: '2'
    },
    {
      text: 'C',
      index: '3'
    },
    {
      text: 'D',
      index: '4'
    },
    {
      text: 'E',
      index: '5'
    },
    {
      text: 'F',
      index: '6'
    },
    {
      text: 'G',
      index: '7'
    },
    {
      text: 'H',
      index: '8'
    },
    {
      text: 'I',
      index: '9'
    },
    {
      text: 'J',
      index: '10'
    },
    {
      text: 'K',
      index: '11'
    },
    {
      text: 'L',
      index: '12'
    },
    {
      text: 'M',
      index: '13'
    },
    {
      text: 'N',
      index: '14'
    },
    {
      text: 'O',
      index: '15'
    },
    {
      text: 'P',
      index: '16'
    }
  ];
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
