<!-- 城市详情抽屉 -->
<template>
  <transition name="drawer">
    <aside v-if="dashboardStore.selectedCity" class="city-drawer">
      <div class="drawer-header">
        <span class="drawer-title">{{ dashboardStore.selectedCity }} · 城市详情</span>
        <span class="drawer-close" @click="clearSelection">×</span>
      </div>
      <transition name="fade" mode="out-in">
        <div class="drawer-body" :key="dashboardStore.selectedCity">
          <!-- 核心指标 -->
          <div class="metric-grid">
            <div class="metric-item">
              <div class="metric-value">{{ metric.tourists }}<span class="metric-unit">万人</span></div>
              <div class="metric-label">接待人次</div>
            </div>
            <div class="metric-item">
              <div class="metric-value">{{ metric.revenue }}<span class="metric-unit">万元</span></div>
              <div class="metric-label">旅游收入</div>
            </div>
            <div class="metric-item">
              <div class="metric-value growth" :class="{ down: metric.growth < 0 }">
                {{ metric.growth }}<span class="metric-unit">%</span>
              </div>
              <div class="metric-label">同比增速</div>
            </div>
          </div>
          <!-- 热门景点 Top3 -->
          <div class="spots">
            <div class="spots-title">热门景点 Top3</div>
            <div class="spot-item" v-for="(spot, index) in metric.spots.slice(0, 3)" :key="spot.label">
              <span class="spot-rank" :class="'rank-' + (index + 1)">{{ index + 1 }}</span>
              <span class="spot-name">{{ spot.label }}</span>
              <div class="spot-bar">
                <span class="spot-bar-inner" :style="{ width: getBarWidth(spot.value) }"></span>
              </div>
              <span class="spot-value">{{ spot.value }}万</span>
            </div>
          </div>
        </div>
      </transition>
    </aside>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { dashboardStore, clearSelection } from '@/store/dashboard'
import { getMetric } from '@/assets/data/cityData'

const metric = computed(() => getMetric(dashboardStore.selectedCity))

const maxSpotValue = computed(() => Math.max(...metric.value.spots.map(item => item.value), 1))
const getBarWidth = (value: number) => `${(value / maxSpotValue.value) * 100}%`
</script>

<style lang="scss" scoped>
.city-drawer {
  position: absolute;
  top: 180px;
  right: 516px;
  z-index: 30;
  width: 340px;
  padding: 20px 24px 28px;
  box-sizing: border-box;
  background: linear-gradient(160deg, rgba(16, 24, 48, 0.92), rgba(30, 40, 72, 0.88));
  border: 1px solid rgba(218, 163, 88, 0.5);
  border-radius: 8px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}
.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(218, 163, 88, 0.3);
  .drawer-title {
    font-size: 18px;
    font-weight: 700;
    color: rgba(255, 213, 138, 1);
    letter-spacing: 2px;
  }
  .drawer-close {
    font-size: 20px;
    color: rgba(201, 211, 234, 0.7);
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #fff;
    }
  }
}
.drawer-body {
  padding-top: 16px;
}
.metric-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  .metric-item {
    padding: 12px 4px;
    text-align: center;
    background: rgba(92, 109, 152, 0.25);
    border-radius: 6px;
    .metric-value {
      font-size: 22px;
      font-family: 'UniDreamLED';
      color: #fff;
      text-shadow: 0 0 10px rgba(154, 110, 44, 0.8);
      &.growth {
        color: rgba(11, 212, 167, 1);
        &.down {
          color: rgba(247, 61, 75, 1);
        }
      }
      .metric-unit {
        margin-left: 2px;
        font-size: 12px;
        font-family: initial;
        color: rgba(201, 211, 234, 0.8);
      }
    }
    .metric-label {
      margin-top: 6px;
      font-size: 13px;
      color: rgba(201, 211, 234, 1);
    }
  }
}
.spots {
  margin-top: 20px;
  .spots-title {
    font-size: 15px;
    color: rgba(255, 213, 138, 1);
    letter-spacing: 1px;
    margin-bottom: 12px;
  }
  .spot-item {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
    font-size: 14px;
    .spot-rank {
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      border-radius: 4px;
      font-size: 12px;
      color: #fff;
      background: rgba(100, 110, 132, 0.8);
      &.rank-1 {
        background: rgba(247, 61, 75, 0.9);
      }
      &.rank-2 {
        background: rgba(244, 168, 65, 0.9);
      }
      &.rank-3 {
        background: rgba(218, 163, 88, 0.8);
      }
    }
    .spot-name {
      width: 96px;
      color: rgba(201, 211, 234, 1);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .spot-bar {
      flex: 1;
      height: 6px;
      background: rgba(100, 110, 132, 0.6);
      border-radius: 3px;
      overflow: hidden;
      .spot-bar-inner {
        display: block;
        height: 100%;
        border-radius: 3px;
        background: linear-gradient(90deg, #ffa832, #f8c47d);
        transition: width 0.6s ease;
      }
    }
    .spot-value {
      width: 48px;
      text-align: right;
      color: rgba(255, 187, 94, 1);
    }
  }
}
// 抽屉滑入滑出
.drawer-enter-active,
.drawer-leave-active {
  transition: all 0.45s ease;
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
// 内容切换淡入淡出
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
