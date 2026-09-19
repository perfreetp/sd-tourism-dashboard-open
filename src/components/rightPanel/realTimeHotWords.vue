<!-- 实时热词  -->
<template>
  <CPanel>
    <template #header>{{ scopeName }}实时热词</template>
    <template #content>
      <div class="words">
        <CEcharts :option="option" />
      </div>
    </template>
  </CPanel>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CPanel from '@/components/common/CPanel.vue'
import CEcharts from '@/components/common/CEcharts.vue'
import defaultIcon from '@/assets/images/real-circle-defalut.png'
import hotIcon from '@/assets/images/real-circle-hot.png'
import { wordLayout } from '@/assets/data/cityData'
import { useDashboardData } from '@/composables/useDashboardData'

const { scopeName, hotWords } = useDashboardData()

const initEcharts = () => {
  const optionData = hotWords.value.map((item, i) => {
    const isProvince = hotWords.value.length > 5
    const position: [number, number] = isProvince
      ? ([
          [50, 50],
          [10, 30],
          [85, 80],
          [27, 55],
          [68, 17],
          [20, 90],
          [35, 20],
          [65, 89],
          [90, 40]
        ][i] as [number, number])
      : wordLayout[i]
    return {
      name: item.name,
      number: item.value,
      value: position,
      symbolSize: item.value > 15 ? 70 : 60,
      symbol: item.value > 15 ? 'image://' + hotIcon : 'image://' + defaultIcon
    }
  })
  const options: any = {
    grid: {
      show: false,
      top: 20,
      left: 10,
      right: 10,
      bottom: 10
    },
    xAxis: [
      {
        type: 'value',
        show: false,
        min: 0,
        max: 100
      }
    ],
    yAxis: [
      {
        min: 0,
        show: false,
        max: 100
      }
    ],

    series: [
      {
        type: 'scatter',
        label: {
          normal: {
            show: true,
            formatter: (params: any) => {
              if (params.data.number > 15) {
                return `{hotName|${params.data.name}}\n{hotValue|${params.data.number}%}`
              } else {
                return `{name|${params.data.name}}\n{value|${params.data.number}%}`
              }
            },
            rich: {
              hotName: {
                color: 'rgba(218, 163, 88, 1)',
                fontSize: 16,
                padding: [0, 0, 8, 0],
                align: 'center'
              },
              hotValue: {
                color: 'rgba(218, 163, 88, 1)',
                fontSize: 14
              },
              name: {
                color: 'rgba(218, 198, 88, 1)',
                fontSize: 13,
                padding: [0, 0, 8, 0],
                align: 'center'
              },
              value: {
                color: 'rgba(218, 198, 88, 1)',
                fontSize: 12,
                align: 'center'
              }
            }
          }
        },
        animationDurationUpdate: 500,
        animationEasingUpdate: 'cubicInOut',
        animationDelay: function (idx: number) {
          return idx * 60
        },
        data: optionData
      }
    ]
  }
  return options
}

const option = computed(() => initEcharts())
</script>

<style lang="scss" scoped>
:deep(.panel-container) {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.words {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 150px;
  background: url('@/assets/images/热词背景.png') no-repeat center center;
  background-size: 100% 100%;
  box-sizing: border-box;
  display: flex;
  padding: 0 12px 6px 12px;
  flex-direction: column;
  gap: 16px;
}
</style>
