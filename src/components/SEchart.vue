<template>
  <div :id="id" :class="className" ref="echartsRef" :style="{ width, height }"></div>
</template>

<script>
  import { onMounted, onUnmounted, ref, watch } from 'vue';
  import * as echarts from 'echarts';
  import noData from '../../assets/img/images/noData02.png';

  /**
   * 初始化一些基础配置
   * @param {*} config
   * @returns
   */
  const initOption = function (config) {
    const option = {
      title: {
        show: true, // 是否要展示“暂无数据”矢量图
        text: ' {a|}', // 写入占位符a，以便后续填充内容
        x: 'center',
        y: 'center',
        subtext: '暂无数据', // 子标题
        itemGap: -10, // 设置主副标题间隔
        textStyle: {
          rich: {
            a: {
              height: 60,
              width: 100,
              borderColor: '#fff',
              align: 'center',
              backgroundColor: {
                image: noData
              }
            }
          }
        },
        subtextStyle: {
          // 配置副标题的文字样式
          fontSize: 12,
          color: 'rgba(0, 194, 255, 0.75)'
        }
      }
    };
    return option;
  };
  export default {
    name: 'SEchart',
    props: {
      id: {
        type: String,
        default: 'chart'
      },
      className: {
        type: String,
        default: 'echart-container'
      },
      option: {
        type: Object,
        required: true
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100%'
      }
    },
    setup(props) {
      const echartsRef = ref(null);
      let chartInstance = null;

      const initChart = () => {
        chartInstance = echarts.init(echartsRef.value);
        chartInstance.setOption(props.option);
      };

      onMounted(() => {
        initChart();
        window.addEventListener('resize', chartInstance.resize);
      });

      onUnmounted(() => {
        window.removeEventListener('resize', chartInstance.resize);
        chartInstance.dispose();
      });

      watch(
        () => props.option,
        (newOption) => {
          if (chartInstance) {
            chartInstance.setOption(newOption);
            // 判断是否是有数据，没有书卷展示默认的‘暂无数据’
            let isEmpty = newOption.series.some((item) => item.data.length === 0);
            if (isEmpty) {
              chartInstance.setOption(initOption());
            } else {
              chartInstance.setOption(newOption);
            }
          }
        },
        { deep: true }
      );

      return { echartsRef };
    }
  };
</script>

<style lang="less">
  .echart-container {
    ::v-deep div:nth-of-type(1) {
      width: 100% !important;
      height: 100% !important;

      canvas {
        width: 100% !important;
        height: 100% !important;
      }
    }
    ::v-deep div:nth-of-type(2) {
      font-size: 12px !important;
      pointer-events: auto !important;
      div {
        font-size: 12px !important;
      }
      span {
        font-size: 12px !important;
      }
    }
  }
</style>
