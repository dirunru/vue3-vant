<template>
  <div class="echart-list layout">
    <swipe-tag
      :list="list"
      :selected="scrollTag"
      :page="{
        line: 3
      }"
      @clickTag="handleClick"
    />
    <div class="echart-scroll-content boxScroll" @scroll="onScroll">
      <div class="echart-box" id="top5">
        <div class="echart-title">
          <div class="line"></div>
          <div class="title">top5</div>
        </div>
        <div class="echart-content box-middle">
          <s-echart width="100%" height="100%" ref="visitChartRef" :option="top5Option"></s-echart>
        </div>
      </div>
      <div class="echart-box" id="circle">
        <div class="echart-title">
          <div class="line"></div>
          <div class="title">合格率</div>
        </div>
        <div class="echart-content box">
          <s-echart width="100%" height="100%" ref="visitChartRef" :option="circleChartOption"></s-echart>
        </div>
      </div>
      <div class="echart-box" id="rank">
        <div class="echart-title">
          <div class="line"></div>
          <div class="title">百分比</div>
        </div>
        <div class="echart-content box">
          <s-echart width="100%" height="100%" ref="visitChartRef" :option="rateOption"></s-echart>
        </div>
      </div>
      <div class="echart-box" id="levelBar">
        <div class="echart-title">
          <div class="line"></div>
          <div class="title">横向双柱</div>
        </div>
        <div class="echart-content box-big">
          <s-echart width="100%" height="100%" ref="visitChartRef" :option="defectStatisticsOption"></s-echart>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import SEchart from '@/components/SEchart.vue'
  import useEcharts from '@/hooks/use-echarts.js'
  import SwipeTag from '@/components/SwipeTag.vue'
  import { debounce, throttle } from 'lodash-es'
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
  const defectStatisticsOption = reactive({
    ...levelBarOption.addOption({
      color: ['#00F6FF', '#007CFF']
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
    },
    {
      id: 'levelBar',
      title: '横向双柱'
    }
  ]
  const scrollTag = ref('')
  const handleClick = e => {
    //点击便签滚动
    let selector = e.id //判断当前是否有传入对的 id  如果有那么不是点击的回到顶部 如果没有那么就是点击的回到顶部
    document.getElementById(selector).scrollIntoView({
      behavior: 'smooth', // 平滑过渡: "auto"表示浏览器自动选择滚动方式，"smooth"表示平滑滚动，"instant"表示瞬间滚动。
      /**
       * 用于指定滚动的垂直方向，默认值为"start"。
       * "start"表示将元素的顶部与可见区域的顶部对齐，
       * "center"表示将元素的中部与可见区域的中部对齐，
       * "end"表示将元素的底部与可见区域的底部对齐，
       * "nearest"表示将元素滚动到可见区域内，如果元素已经在可见区域内，则不进行滚动。
       *  */
      //
      block: 'start' // 上边框与视窗顶部平齐。
      /**
       *  inline: 用于指定滚动的水平方向，默认值为"nearest"。可以设置为"start"、"center"、"end"或者"nearest"。
       *  "start"表示将元素的左边与可见区域的左边对齐，
       *  "center"表示将元素的中部与可见区域的中部对齐，
       *  "end"表示将元素的右边与可见区域的右边对齐，
       *  "nearest"表示将元素滚动到可见区域内，如果元素已经在可见区域内，则不进行滚动。
       */
    })
  }
  //滚动事件
  const onScroll = debounce(event => {
    let scrollPos = event.target.scrollTop // 当前的滚动位置
    let divElements = document.getElementsByClassName('echart-box')
    let tagListHeight = 160 + 32
    let currentHeight = tagListHeight + scrollPos
    let divId = ''
    for (let i = 0; i < divElements.length; i++) {
      let div = divElements[i]
      let divTop = div.offsetTop // 内容的高度
      let windowHeight = window.innerHeight || document.documentElement.clientHeight
      // console.log('scrollPos', scrollPos,'divTop',divTop, 'windowHeight', windowHeight, 'currentHeight',currentHeight)
      if (currentHeight >= divTop) {
        divId = div.id
      }
    }
    // 进行相应的处理，例如输出ID或者执行其他操作
    // console.log('找到DIV的ID：' + divId)
    scrollTag.value = divId
  }, 200)
</script>
<style lang="less" scoped>
  .echart-list {
    padding: var(--cp-margin);
    .echart-scroll-content {
      height: calc(100vh - 160px - 32px);
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
  }
</style>
