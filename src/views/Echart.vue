<template>
  <div class="echart-list layout">
    <swipe-tag
      :list="list"
      :page="{
        line: 3
      }"
    />
    <div class="echart-box top5">
      <div class="echart-title">
        <div class="line"></div>
        <div class="title">top5</div>
      </div>
      <div class="echart-content box-middle">
        <s-echart width="100%" height="100%" ref="visitChartRef" :option="top5Option"></s-echart>
      </div>
    </div>
    <div class="echart-box circle">
      <div class="echart-title">
        <div class="line"></div>
        <div class="title">合格率</div>
      </div>
      <div class="echart-content box">
        <s-echart width="100%" height="100%" ref="visitChartRef" :option="circleChartOption"></s-echart>
      </div>
    </div>
    <div class="echart-box rate">
      <div class="echart-title">
        <div class="line"></div>
        <div class="title">百分比</div>
      </div>
      <div class="echart-content box">
        <s-echart width="100%" height="100%" ref="visitChartRef" :option="rateOption"></s-echart>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import SEchart from '@/components/SEchart.vue'
  import useEcharts from '@/hooks/use-echarts.js'
  import SwipeTag from '@/components/SwipeTag.vue'
  import {
    doubleBarOption,
    doubleLineOption,
    levelBarOption,
    rankingBarOption,
    rateBarOption
  } from '@/common/configOption'
  const top5Option = reactive({
    ...rankingBarOption.addOption({
      color: ['#FE1516', '#FF7619', '#FFFA39', '#8CF4F7', '#8CF4F7']
    })
  })
  // rateBarOption
  const rateColorList = [
    ['#1B7EF2', 'rgba(27, 126, 242, 0)'],
    ['#29F1FA', 'rgba(41, 241, 250, 0)'],
    ['#FFC42C', 'rgba(255, 196, 44, 0)']
  ]
  const rateOption = reactive({
    ...rateBarOption.addOption({
      color: rateColorList
    })
  })

  const preData = reactive({
    data: [
      { value: 2, name: 'Email' },
      { value: 3, name: 'Union Ads' },
      { value: 5, name: 'Video Ads' }
    ],
    color: ['#FFD550', '#FF9B52', '#FF4C4A']
  })

  const cardData = reactive({
    effectList: [],
    shortcutList: []
  })
  // echarts表的相关数据
  const { circleOption } = useEcharts()
  const circleChartOption = circleOption(preData.data, preData.color)

  const list = [
    {
      id: 'top5',
      title: 'top5'
    },
    {
      id: 'circle',
      title: '合格率'
    },
    {
      id: 'rank',
      title: '排名'
    }
  ]
</script>
<style lang="less" scoped>
  .echart-list {
    padding: var(--cp-margin);

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
        width: 100%;
        border-radius: var(--cp-radius);
        background-color: var(--cp-bg-color-white);
      }
      .box {
        height: 200px;
      }
      .box-middle {
        height: 300px;
      }
      .box-big {
        height: 400px;
      }
    }
  }
</style>
