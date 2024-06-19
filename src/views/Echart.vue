<template>
  <div class="echart-list layout">
    <van-swipe :loop="false" class="part-box">
      <van-swipe-item v-for="(item, idx) in list" :key="idx">
        <div class="part-list">
          <div
            v-for="(it, index) in item"
            :title="it.title"
            :key="idx + '-' + index"
            :class="['part-item', active === idx + '-' + index ? 'active' : '']"
            @click="handleComponent(idx + '-' + index)"
          >
            {{ it.title }}
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
    <div class="echart-box">
      <div class="echart-title">
        <div class="line"></div>
        <div class="title">圆环图</div>
      </div>
      <div class="echart-content">
        
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import { chunk } from 'lodash-es'
  const list = chunk(new Array(50).fill({ title: '测试' }), 16)
  console.log(list)
  const active = ref('')
  const handleComponent = e => {
    active.value = e
  }
</script>
<style lang="less" scoped>
  .echart-list {
    padding: var(--cp-margin);
    .part-box {
      background-color: var(--cp-bg-color-white);
      border-radius: var(--cp-radius);
      :deep(.van-swipe__track) {
        height: 160px;
      }
      .part {
        &-list {
          padding: var(--cp-margin);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px 5px;
          .part-item {
            display: inline-block;
            font-size: 12px;
            padding: 4px 12px;
            border-radius: var(--cp-radius);
            background: #f7f9fa;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            border: solid 1px transparent;
            transition-duration: 0.5;
          }
          .active {
            border: solid 1px #ff7a44;
            background: #fff2ea;
            color: #ff7a44;
          }
        }
      }
    }
    .echart-box {
      margin-top: var(--cp-margin);
      .echart-title {
        display: flex;
        justify-content: center;
        height: 32px;
        line-height: 32px;
        .line {
          width: 3px;
          height: 16px;
          margin-top: 8px;
          background: linear-gradient(140deg, #ffb054 7.43%, #f2632d 80.31%);
        }
        .title {
          width: calc(100% - 16px);
          text-align: left;
          margin-left: 8px;
          font-size: var(--cp-font-size-middle);
        }
      }
      .echart-content {
        height: 200px;
        width: 100%;
        border-radius: var(--cp-radius);
        background-color: var(--cp-bg-color-white);
      }
    }
  }
</style>
