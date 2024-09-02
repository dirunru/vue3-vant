<template>
  <div :id="id" :class="className" ref="echartsRef" :style="{ width, height }"></div>
</template>

<script>
  import { onMounted, onUnmounted, ref, watch } from 'vue';
  import * as echarts from 'echarts';

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
