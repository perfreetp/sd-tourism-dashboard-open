<!-- 山东实时热词  -->
<template>
  <CPanel>
    <template #header>山东实时热词</template>
    <template #content>
      <div class="words">
        <CEcharts :option="option" />
      </div>
    </template>
  </CPanel>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import CPanel from '@/components/common/CPanel.vue'
import CEcharts from '@/components/common/CEcharts.vue'
import defaultIcon from '@/assets/images/real-circle-defalut.png'
import hotIcon from '@/assets/images/real-circle-hot.png'
import { dashboardStore } from '@/store/dashboard'
import { getCityPanelData, getProvincePanelData } from '@/assets/data/cityData'
const option = ref<any>({})
const initEcharts = () => {
  const wordsData = (dashboardStore.selectedCity
    ? getCityPanelData(dashboardStore.selectedCity)
    : getProvincePanelData()
  ).hotWords
  const optionData: any = []
  // 渲染数据，并写入chart
  wordsData.map((item: any) => {
    optionData.push({
      name: item.name,
      number: item.value,
      value: item.position,
      symbolSize: item.value > 15 ? 70 : 60,
      symbol: item.value > 15 ? 'image://' + hotIcon : 'image://' + defaultIcon
    })
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
        animationEasingUpdate: 500,
        animationDelay: function (idx: number) {
          return idx * 100
        },
        data: optionData
      }
    ]
  }
  return options
}
onMounted(() => {
  option.value = initEcharts()
})
// 城市切换时刷新热词
watch(
  () => dashboardStore.selectedCity,
  () => {
    option.value = initEcharts()
  }
)
</script>

<style lang="scss" scoped>
::v-deep .panel-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.words {
  position: relative;
  width: 100%;
  height: 200px;
  background: url('@/assets/images/热词背景.png') no-repeat center center;
  background-size: 100% 175px;
  box-sizing: border-box;
  display: flex;
  padding: 0 12px 14px 12px;
  flex-direction: column;
  gap: 16px;
}
</style>
