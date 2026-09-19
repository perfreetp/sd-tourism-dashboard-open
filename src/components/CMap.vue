<!--  中间地图部分 -->
<template>
  <div class="map" id="map">
    <div class="map-content">
      <CEcharts :option="mapOption" @eclick="onChartClick" />
      <!-- 返回全省总览 -->
      <transition name="back-btn">
        <button v-if="!isProvince" class="back-btn" @click="backToProvince">
          ⤺ 返回全省总览
        </button>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { getMapOption } from '@/modules/echartMap'
import CEcharts from './common/CEcharts.vue'
import { useDashboard } from '@/stores/dashboard'

const { selectedCity, isProvince, toggleCity, backToProvince } = useDashboard()

const mapOption = computed(() => getMapOption(selectedCity.value))

const CITY_SET = new Set([
  '济南市',
  '青岛市',
  '淄博市',
  '枣庄市',
  '东营市',
  '烟台市',
  '潍坊市',
  '济宁市',
  '泰安市',
  '威海市',
  '日照市',
  '临沂市',
  '德州市',
  '聊城市',
  '滨州市',
  '菏泽市'
])

const onChartClick = (params: { name?: string } | unknown) => {
  const name = (params as { name?: string })?.name
  if (name && CITY_SET.has(name)) {
    toggleCity(name)
  }
}
</script>

<style lang="scss" scoped>
.map {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .map-content {
    position: relative;
    width: 1920px;
    height: 1080px;
  }
}
.back-btn {
  position: absolute;
  top: 168px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  padding: 8px 22px;
  font-size: 15px;
  letter-spacing: 1px;
  color: #ffe3a8;
  background: linear-gradient(180deg, rgba(94, 66, 28, 0.9), rgba(60, 40, 16, 0.9));
  border: 1px solid rgba(218, 163, 88, 0.8);
  border-radius: 18px;
  cursor: pointer;
  box-shadow: 0 0 14px rgba(218, 163, 88, 0.45);
  transition: all 0.25s ease;
  &:hover {
    background: linear-gradient(180deg, rgba(140, 96, 38, 0.95), rgba(90, 60, 22, 0.95));
    box-shadow: 0 0 22px rgba(218, 163, 88, 0.75);
  }
}
.back-btn-enter-active,
.back-btn-leave-active {
  transition: all 0.35s ease;
}
.back-btn-enter-from,
.back-btn-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-10px);
}
</style>
