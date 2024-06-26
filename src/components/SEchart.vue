<template>
  <div ref="echartsRef" :style="{ width, height }"></div>
</template>

<script>
  import { onMounted, onUnmounted, ref, watch } from 'vue'
  import * as echarts from 'echarts'

  export default {
    name: 'SEchart',
    props: {
      option: {
        type: Object,
        required: true
      },
      width: {
        type: String,
        default: '600px'
      },
      height: {
        type: String,
        default: '400px'
      }
    },
    setup(props) {
      const echartsRef = ref(null)
      let chartInstance = null

      const initChart = () => {
        chartInstance = echarts.init(echartsRef.value)
        chartInstance.setOption(props.option)
      }

      onMounted(() => {
        initChart()
        window.addEventListener('resize', chartInstance.resize)
      })

      onUnmounted(() => {
        window.removeEventListener('resize', chartInstance.resize)
        chartInstance.dispose()
      })

      watch(
        () => props.option,
        newOption => {
          if (chartInstance) {
            chartInstance.setOption(newOption)
          }
        },
        { deep: true }
      )

      return { echartsRef }
    }
  }
</script>
