<!-- 城市详情抽屉 -->
<template>
  <transition name="drawer">
    <aside v-if="city" class="city-drawer">
      <div class="city-drawer__header">
        <span class="title">{{ city.name }}旅游详情</span>
        <span class="close" @click="backToProvince">×</span>
      </div>
      <div class="city-drawer__body">
        <div class="metric-grid">
          <div class="metric metric--visitors">
            <div class="metric__label">累计接待人次</div>
            <div class="metric__value">
              {{ city.visitors }}<span class="metric__unit">万人次</span>
            </div>
          </div>
          <div class="metric metric--revenue">
            <div class="metric__label">旅游收入</div>
            <div class="metric__value">
              {{ city.revenue }}<span class="metric__unit">亿元</span>
            </div>
          </div>
          <div class="metric" :class="city.growth >= 0 ? 'metric--up' : 'metric--down'">
            <div class="metric__label">同比增速</div>
            <div class="metric__value">
              {{ city.growth > 0 ? '+' : '' }}{{ city.growth }}<span class="metric__unit">%</span>
            </div>
          </div>
          <div class="metric metric--spend">
            <div class="metric__label">人均消费</div>
            <div class="metric__value">
              {{ avgSpend }}<span class="metric__unit">元/人次</span>
            </div>
          </div>
        </div>

        <div class="spots">
          <div class="spots__title">热门景点 TOP3</div>
          <div class="spots__item" v-for="(spot, i) in city.spots.slice(0, 3)" :key="spot.name">
            <span class="spots__rank" :class="'rank-' + (i + 1)">{{ i + 1 }}</span>
            <span class="spots__name">{{ spot.name }}</span>
            <div class="spots__bar">
              <span class="spots__bar-inner" :style="{ width: barWidth(spot.value) }"></span>
            </div>
            <span class="spots__value">{{ spot.value }}万</span>
          </div>
        </div>
      </div>
    </aside>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardData } from '@/composables/useDashboardData'
import { useDashboard } from '@/stores/dashboard'

const { city } = useDashboardData()
const { backToProvince } = useDashboard()

const avgSpend = computed(() =>
  city.value ? Math.round((city.value.revenue * 10000) / city.value.visitors) : 0
)

const maxSpot = computed(() =>
  city.value && city.value.spots.length ? city.value.spots[0].value : 1
)
const barWidth = (v: number) => `${Math.round((v / maxSpot.value) * 100)}%`
</script>

<style lang="scss" scoped>
.city-drawer {
  position: absolute;
  top: 200px;
  left: 520px;
  z-index: 60;
  width: 320px;
  border-radius: 6px;
  border: 1px solid rgba(218, 163, 88, 0.55);
  background: linear-gradient(180deg, rgba(16, 28, 60, 0.92), rgba(10, 18, 42, 0.94));
  box-shadow: 0 0 24px rgba(20, 40, 90, 0.7);
  backdrop-filter: blur(3px);
  &__header {
    height: 44px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    letter-spacing: 2px;
    color: #ffd36e;
    border-bottom: 1px solid rgba(218, 163, 88, 0.3);
    background: linear-gradient(90deg, rgba(218, 163, 88, 0.22), rgba(218, 163, 88, 0));
    .close {
      font-size: 22px;
      line-height: 1;
      color: #9fb0d6;
      cursor: pointer;
      transition: color 0.2s;
      &:hover {
        color: #ffd36e;
      }
    }
  }
  &__body {
    padding: 14px 16px 18px;
  }
}
.metric-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.metric {
  padding: 10px 12px;
  border-radius: 4px;
  background: rgba(40, 60, 110, 0.35);
  border: 1px solid rgba(109, 128, 175, 0.35);
  transition: all 0.3s ease;
  &__label {
    font-size: 12px;
    color: #9fb0d6;
    margin-bottom: 6px;
  }
  &__value {
    font-size: 24px;
    font-weight: 700;
    color: #ffe3a8;
    font-family: 'UniDreamLED', sans-serif;
    text-shadow: 0 0 10px rgba(218, 163, 88, 0.5);
  }
  &__unit {
    font-size: 12px;
    font-family: initial;
    margin-left: 4px;
    color: #9fb0d6;
  }
  &--up .metric__value {
    color: #ff8a7a;
  }
  &--down .metric__value {
    color: #39e0b0;
  }
}
.spots {
  margin-top: 14px;
  &__title {
    font-size: 15px;
    color: #cfe0ff;
    margin-bottom: 10px;
    padding-left: 8px;
    border-left: 3px solid rgba(218, 163, 88, 0.9);
  }
  &__item {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 32px;
    font-size: 13px;
  }
  &__rank {
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border-radius: 3px;
    font-size: 12px;
    font-weight: 700;
    background: rgba(109, 128, 175, 0.5);
    color: #d7e2f5;
    &.rank-1 {
      background: linear-gradient(180deg, #ffd36e, #e0932f);
      color: #3a2400;
    }
    &.rank-2 {
      background: linear-gradient(180deg, #e6edf9, #aab7cf);
      color: #2a3448;
    }
    &.rank-3 {
      background: linear-gradient(180deg, #e0a36a, #a9682c);
      color: #2a1600;
    }
  }
  &__name {
    width: 96px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #c9d3ea;
  }
  &__bar {
    flex: 1;
    height: 5px;
    border-radius: 3px;
    background: rgba(92, 109, 152, 0.5);
    overflow: hidden;
  }
  &__bar-inner {
    display: block;
    height: 100%;
    border-radius: 3px;
    background: linear-gradient(90deg, #ffa832, #f8c47d);
    transition: width 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }
  &__value {
    width: 44px;
    text-align: right;
    color: #ffc978;
  }
}
.drawer-enter-active,
.drawer-leave-active {
  transition: all 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}
</style>
