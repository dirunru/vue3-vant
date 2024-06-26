<template>
  <div ref="chartContainer" class="chart-container" :style="{ width: width, height: height }" />
</template>

<script setup>
  import { ref, onMounted, onBeforeUnmount, watch, defineExpose } from 'vue'
  import * as echarts from 'echarts'

  const props = defineProps({
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
  })

  const chartContainer = ref(null)
  let chartInstance = null

  onMounted(() => {
    if (chartContainer.value) {
      chartInstance = echarts.init(chartContainer.value)
      updateChart()
    }
  })

  onBeforeUnmount(() => {
    if (chartInstance) {
      chartInstance.dispose()
    }
  })

  watch(
    () => props.option,
    () => {
      updateChart()
    },
    { deep: true }
  )

  function updateChart() {
    if (chartInstance) {
      chartInstance.setOption(props.option, true)
    }
  }

  const resize = () => {
    chartInstance && chartInstance.resize()
  }

  defineExpose({ resize })
</script>
<style scoped lang="less">
  .chart-container {
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
