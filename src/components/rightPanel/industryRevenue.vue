<!-- 各行业收入 -->
<template>
  <CPanel>
    <template #header>{{ scopeName }}各行业收入</template>
    <template #content>
      <CEcharts ref="chartRef" :option="option" @onload="startHighlightLoop" />
    </template>
  </CPanel>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref } from 'vue'
import * as echarts from 'echarts'
import CPanel from '@/components/common/CPanel.vue'
import CEcharts from '@/components/common/CEcharts.vue'
import { useDashboardData } from '@/composables/useDashboardData'

const { scopeName, industry } = useDashboardData()
const chartRef = ref()
let highlightTimer: any = null
let currentIndex = 0

const xAxisData = ['旅游', '住宿', '餐饮', '购物', '娱乐', '交通', '其他']

const createEchartBar = () => {
  const seriesData = xAxisData.map((key) => ({
    value: +(industry.value as any)[key].toFixed(1)
  }))

  return {
    grid: {
      left: '0%',
      right: '0%',
      top: '20%',
      bottom: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisLine: {
        show: true,
        lineStyle: {
          width: 2,
          color: 'rgba(76, 93, 130, 1)'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontSize: 12,
        color: '#C5D6E6',
        textStyle: {
          color: '#C5D6E6'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      name: '亿',
      nameTextStyle: {
        color: 'rgba(201, 211, 234, 1)',
        fontSize: 14,
        padding: [0, 32, 12, 0]
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(52, 71, 112, 1)',
          type: 'dashed'
        }
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        fontSize: 14,
        color: '#C5D6E6',
        textStyle: {
          color: '#C5D6E6',
          fontSize: 14
        }
      }
    },
    series: [
      {
        type: 'pictorialBar',
        name: '渐变背景',
        barWidth: 14,
        symbol: 'rect',
        symbolSize: '100%',
        symbolPosition: 'start',
        symbolOffset: [0, 0],
        label: {
          normal: {
            show: true,
            position: 'top',
            formatter: (params: any) => seriesData[params.dataIndex].value,
            fontSize: 12,
            lineHeight: 16,
            color: '#93B9FF'
          }
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(218, 163, 88, 1)'
              },
              {
                offset: 1,
                color: 'rgba(255, 130, 54, 1)'
              }
            ])
          }
        },
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(197, 213, 249, 1)'
              },
              {
                offset: 1,
                color: 'rgba(120, 144, 199, 1)'
              }
            ])
          }
        },
        z: 1,
        zlevel: 0,
        data: seriesData.map((item) => item.value)
      },
      {
        type: 'pictorialBar',
        name: '块状切片',
        itemStyle: {
          normal: {
            color: '#011140'
          }
        },
        barWidth: 14,
        symbolRepeat: 28,
        symbol: 'rect',
        symbolClip: true,
        symbolSize: [14, 2],
        symbolPosition: 'start',
        symbolOffset: [0, 0],
        data: seriesData.map((item) => item.value),
        z: 2,
        zlevel: 0
      }
    ],
    animationDurationUpdate: 600,
    animationEasingUpdate: 'cubicInOut'
  }
}

const option = computed(() => createEchartBar())

// 高亮循环方法
const startHighlightLoop = (chart: any) => {
  if (!chart) return
  if (highlightTimer) {
    clearInterval(highlightTimer)
    highlightTimer = null
  }
  highlightTimer = setInterval(() => {
    chart.dispatchAction({
      type: 'downplay'
    })
    chart.dispatchAction({
      type: 'highlight',
      seriesIndex: 0,
      dataIndex: currentIndex
    })
    currentIndex = (currentIndex + 1) % xAxisData.length
  }, 1500)
}

onUnmounted(() => {
  if (highlightTimer) {
    clearInterval(highlightTimer)
  }
})
</script>
<style lang="scss" scoped></style>
