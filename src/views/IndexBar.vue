<template>
  <div class="layout">
    <div class="box"></div>
    <div class="content">
      <SIndexBar :indexList="indexList" :sticky="false">
        <template v-for="item in indexList" :key="item.index">
          <SIndexAnchor :index="item.index">
            {{ item.index + ':' + item.text }}
          </SIndexAnchor>
          <div class="section-box">
            {{ item.text }}
          </div>
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
      index: '1',
      finish: true
    },
    {
      text: 'B',
      index: '2',
      finish: true
    },
    {
      text: 'C',
      index: '3',
      finish: true
    },
    {
      text: 'D',
      index: '4',
      finish: true
    },
    {
      text: 'E',
      index: '5',
      finish: false
    },
    {
      text: 'F',
      index: '6',
      finish: false
    },
    {
      text: 'G',
      index: '7',
      finish: false
    },
    {
      text: 'H',
      index: '8',
      finish: false
    },
    {
      text: 'I',
      index: '9',
      finish: true
    },
    {
      text: 'J',
      index: '10',
      finish: true
    },
    {
      text: 'K',
      index: '11',
      finish: true
    },
    {
      text: 'L',
      index: '12',
      finish: true
    },
    {
      text: 'M',
      index: '13',
      finish: true
    },
    {
      text: 'N',
      index: '14',
      finish: true
    },
    {
      text: 'O',
      index: '15',
      finish: true
    },
    {
      text: 'P',
      index: '16',
      finish: true
    }
  ];
</script>
<style lang="less" scoped>
  .layout {
    display: flex;
    flex-direction: column;
    .box {
      position: fixed;
      top: 0;
      height: 50px;
      width: 100%;
      background: #fff;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      opacity: 0.7;
    }
    .content {
      margin-top: 66px;
      height: calc(100vh - 66px);
      overflow: auto;
      margin-left: 10px;
      margin-right: 10px;
      .section-box {
        height: 300px;
        background: #fff;
        border-radius: 10px;
      }
    }
  }
</style>
