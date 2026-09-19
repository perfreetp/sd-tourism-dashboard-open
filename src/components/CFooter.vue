<!-- 底部组件 -->
<template>
  <footer class="number-footer">
    <div class="number-item" v-for="item in numberData" :key="item.titleSuffix">
      <!-- 标题 -->
      <div class="title">{{ year }}年{{ item.titlePrefix }}{{ scopeName === '全省' ? '全省' : scopeName }}{{ item.titleSuffix }}</div>
      <!-- 数据 -->
      <div class="data">
        <img class="data-img" :src="item.img" alt="图标" />
        <div class="data-info">
          <!-- 数字 -->
          <div class="number">
            <transition name="num-fade" mode="out-in">
              <Vue3Odometer :key="item.value" class="number-value" :value="item.value" />
            </transition>
            <span class="number-unit">{{ item.unit }}</span>
          </div>
          <!-- 比较信息 -->
          <div class="compare">
            <span class="compare-label">同比增速</span>
            <img class="compare-img" :src="growth >= 0 ? up : down" alt="上涨下跌图标" />
            <span
              class="compare-value"
              :style="{ color: growth >= 0 ? 'rgba(247, 61, 75, 1)' : 'rgba(11, 212, 167, 1)' }"
            >
              {{ Math.abs(growth) }}%
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Vue3Odometer from 'vue3-odometer'
import 'odometer/themes/odometer-theme-default.css'
import 行李箱图标 from '@/assets/images/行李箱图标.png'
import 收入图标 from '@/assets/images/收入图标.png'
import 刷卡图标 from '@/assets/images/刷卡图标.png'
import up from '@/assets/images/up.png'
import down from '@/assets/images/down.png'
import { useDashboardData } from '@/composables/useDashboardData'

const year = 2022
const { scopeName, visitors, revenue, outbound, growth } = useDashboardData()

const numberData = computed(() => [
  {
    titlePrefix: '',
    titleSuffix: '旅游业收入',
    value: revenue.value,
    unit: '亿元',
    img: 收入图标
  },
  {
    titlePrefix: '',
    titleSuffix: '来访游客数',
    value: visitors.value,
    unit: '万人',
    img: 行李箱图标
  },
  {
    titlePrefix: '',
    titleSuffix: '人口出游支出',
    value: outbound.value,
    unit: '亿元',
    img: 刷卡图标
  }
])
</script>

<style lang="scss" scoped>
.number-footer {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 72px;
  pointer-events: none;
  bottom: 24px;
}
.number-item {
  position: relative;
  width: 268px;
  display: flex;
  flex-direction: column;
  gap: 12px;
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
      gap: 12px;
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
.num-fade-enter-active,
.num-fade-leave-active {
  transition: all 0.3s ease;
}
.num-fade-enter-from,
.num-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
