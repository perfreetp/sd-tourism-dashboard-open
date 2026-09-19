<template>
  <main class="container">
    <!-- 顶部标题 -->
    <CHeader />
    <!-- 地图部分 -->
    <CMap />
    <!-- 左侧数据面板 -->
    <LeftPanel />
    <!-- 右侧数据面板 -->
    <RightPanel />
    <!-- 底部组件 -->
    <CFooter />
    <!-- 城市详情抽屉 -->
    <CityDrawer />
  </main>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, watch } from 'vue'
import autofit from 'autofit.js'
import CHeader from '@/components/CHeader.vue'
import CMap from '@/components/CMap.vue'
import LeftPanel from '@/components/leftPanel.vue'
import RightPanel from '@/components/rightPanel.vue'
import CFooter from '@/components/CFooter.vue'
import CityDrawer from '@/components/CityDrawer.vue'
import { useDashboard } from '@/stores/dashboard'
import { evaluateCity } from '@/stores/alerts'
import { cityDataMap } from '@/assets/data/cityData'

const { selectedCity, backToProvince } = useDashboard()

const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && selectedCity.value) {
    backToProvince()
  }
}

watch(
  selectedCity,
  (name) => {
    if (name && cityDataMap[name]) {
      evaluateCity(cityDataMap[name])
    }
  }
)

onMounted(() => {
  autofit.init({
    el: 'body',
    dh: 1080,
    dw: 1920,
    resize: true
  })
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  background: url('@/assets/images/背景.png') no-repeat center center;
  background-size: 100% 100%;
}
</style>
