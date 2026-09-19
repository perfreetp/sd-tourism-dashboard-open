<!-- 接待游客人数TOP5 -->
<template>
  <CPanel>
    <template #header>{{ isProvince ? '接待游客人数TOP5城市' : scopeName + '景点接待TOP5' }}</template>
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

const { scopeName, isProvince, top5 } = useDashboardData()
const chartRef = ref()
let highlightTimer: any = null
let currentIndex = 0

const createEchartBar = () => {
  const names = top5.value.map((i) => i.name)
  const values = top5.value.map((i) => i.value)
  return {
    /**区域位置*/
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      valueFormatter: (v: any) => v + ' 万人次'
    },
    xAxis: {
      type: 'category',
      data: names,
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#C5D6E6',
        fontSize: 12,
        interval: 0,
        formatter: (v: string) => (v.length > 5 ? v.slice(0, 5) + '…' : v)
      }
    },
    yAxis: {
      axisLine: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(52, 71, 112, 1)',
          type: 'dashed'
        }
      },
      axisLabel: {
        color: '#C5D6E6',
        fontSize: 14
      },
      axisTick: {
        show: false
      }
    },
    series: [
      {
        name: '数(万人次)',
        type: 'pictorialBar',
        barWidth: '150%',
        symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
        label: {
          show: true,
          position: 'top',
          fontSize: 14,
          color: 'rgba(201, 211, 234, 1)',
          offset: [0, -10]
        },
        itemStyle: {
          normal: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(
              0,
              1,
              0,
              0,
              [
                {
                  offset: 0,
                  color: 'rgba(94, 111, 153, 0.2)'
                },
                {
                  offset: 0.6,
                  color: 'rgba(94, 111, 153, 0.8)'
                },
                {
                  offset: 1,
                  color: 'rgba(94, 111, 153, 1)'
                }
              ],
              false
            ),
            borderColor: 'rgba(109, 128, 175, 1)',
            borderWidth: 4,
            borderRadius: [100, 100]
          },
          emphasis: {
            color: new echarts.graphic.LinearGradient(
              0,
              1,
              0,
              0,
              [
                {
                  offset: 0,
                  color: 'rgba(218, 163, 88, 0.3)'
                },
                {
                  offset: 0.6,
                  color: 'rgba(218, 163, 88, 0.8)'
                },
                {
                  offset: 1,
                  color: 'rgba(218, 163, 88, 0)'
                }
              ],
              false
            ),
            borderColor: 'rgba(218, 163, 88, 1)'
          }
        },
        data: values,
        z: 10
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
    currentIndex = (currentIndex + 1) % Math.max(top5.value.length, 1)
  }, 1500)
}

onUnmounted(() => {
  if (highlightTimer) {
    clearInterval(highlightTimer)
  }
})
</script>
<style lang="scss" scoped></style>
