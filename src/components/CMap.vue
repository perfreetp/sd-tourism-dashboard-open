<!--  中间地图部分 -->
<template>
  <div class="map" id="map">
    <div class="map-content">
      <CEcharts :option="mapOption" @eclick="onMapClick" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { getMapOption } from '@/modules/echartMap'
import { dashboardStore, selectCity } from '@/store/dashboard'
import { cityNames } from '@/assets/data/cityData'
import CEcharts from './common/CEcharts.vue'

const mapOption = ref(getMapOption())

watch(
  () => dashboardStore.selectedCity,
  city => {
    mapOption.value = getMapOption(city)
  }
)

// 点击柱子、城市名称或地图区域时选中城市
const onMapClick = (params: any) => {
  const name = params?.name
  if (name && cityNames.includes(name)) {
    selectCity(name)
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
</style>
