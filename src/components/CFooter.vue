<!-- 底部组件 -->
<template>
  <footer class="number-footer">
    <div class="number-item" v-for="item in numberData" :key="item.id">
      <!-- 标题 -->
      <transition name="fade" mode="out-in">
        <div class="title" :key="item.title">{{ item.title }}</div>
      </transition>
      <!-- 数据 -->
      <div class="data">
        <img class="data-img" :src="item.img" alt="图标" />
        <div class="data-info">
          <!-- 数字 -->
          <div class="number">
            <Vue3Odometer class="number-value" :key="currentViewName" :value="item.value" />
            <span class="number-unit">{{ item.unit }}</span>
          </div>
          <!-- 比较信息 -->
          <div class="compare">
            <span class="compare-label">同比增速</span>
            <img class="compare-img" :src="item.compare === 'up' ? up : down" alt="上涨下跌图标" />
            <span
              class="compare-value"
              :style="{ color: item.compare === 'up' ? 'rgba(247, 61, 75, 1)' : 'rgba(11, 212, 167, 1)' }"
            >
              {{ item.proportion }}%
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Vue3Odometer from 'vue3-odometer'
import 'odometer/themes/odometer-theme-default.css'
import 行李箱图标 from '@/assets/images/行李箱图标.png'
import 收入图标 from '@/assets/images/收入图标.png'
import 刷卡图标 from '@/assets/images/刷卡图标.png'
import up from '@/assets/images/up.png'
import down from '@/assets/images/down.png'
import { dashboardStore, currentViewName } from '@/store/dashboard'
import { getMetric } from '@/assets/data/cityData'

const buildNumberData = () => {
  const metric = getMetric(dashboardStore.selectedCity)
  const name = currentViewName.value
  return [
    {
      id: 1,
      title: `${name}旅游业收入`,
      value: metric.revenue,
      unit: '万元',
      compare: metric.growth >= 0 ? 'up' : 'down',
      proportion: Math.abs(metric.growth),
      img: 收入图标
    },
    {
      id: 2,
      title: `${name}来访游客数`,
      value: metric.tourists,
      unit: '万人',
      compare: metric.growth >= 0 ? 'up' : 'down',
      proportion: Math.abs(metric.growth),
      img: 行李箱图标
    },
    {
      id: 3,
      title: `${name}人口出游支出`,
      value: metric.spending,
      unit: '万元',
      compare: metric.growth >= 0 ? 'up' : 'down',
      proportion: Math.abs(metric.growth),
      img: 刷卡图标
    }
  ]
}

const numberData = ref<any[]>(buildNumberData())

// 城市切换时重置为对应区域数据
watch(
  () => dashboardStore.selectedCity,
  () => {
    numberData.value = buildNumberData()
  }
)
</script>

<style lang="scss" scoped>
.number-footer {
  position: absolute;
  width: 100%;
  bottom: 24px;
  display: flex;
  justify-content: center;
  gap: 72px;
  pointer-events: none;
  bottom: -200px;
  animation: entranceAnimation ease-in-out 0.75s forwards;
}
.number-item {
  position: relative;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  pointer-events: auto;
  .title {
    height: 35px;
    width: 100%;
    background: url('@/assets/images/titleBg.png') no-repeat center center;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
  }
  .data {
    height: 82px;
    width: 100%;
    display: flex;
    gap: 28px;
    justify-content: center;
    .data-img {
      width: 82px;
      height: 82px;
    }
    .data-info {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 16px;
    }
    .number {
      display: flex;
      align-items: end;
      gap: 10px;
      .number-value {
        font-size: 32px;
        font-family: 'UniDreamLED';
        color: #fff;
        text-shadow: 0px 0px 13px rgb(154, 110, 44);
      }
      .number-unit {
        font-size: 14px;
        color: #fff;
      }
    }
    .compare {
      display: flex;
      align-items: center;
      gap: 10px;
      .compare-label {
        font-size: 14px;
        color: #c9d3ea;
        margin-right: 14px;
      }
      .compare-img {
        width: 20px;
        height: 12px;
      }
    }
  }
}
@keyframes entranceAnimation {
  0% {
    bottom: -200px;
  }
  100% {
    bottom: 24px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
