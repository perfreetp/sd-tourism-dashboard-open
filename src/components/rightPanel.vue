<!-- 右侧数据面板 -->
<template>
  <div class="right-panel">
    <!-- 各行业收入 -->
    <industryRevenue />
    <!-- 接待游客人数TOP5 -->
    <top5Tourists />
    <!-- 山东省实时热词 -->
    <realTimeHotWords />
    <!-- 实时告警 -->
    <realTimeAlerts />
  </div>
</template>

<script setup lang="ts">
import industryRevenue from './rightPanel/industryRevenue.vue'
import top5Tourists from './rightPanel/top5Tourists.vue'
import realTimeHotWords from './rightPanel/realTimeHotWords.vue'
import realTimeAlerts from './rightPanel/realTimeAlerts.vue'
</script>

<style lang="scss" scoped>
.right-panel {
  position: absolute;
  width: 500px;
  height: 100%;
  right: 0;
  top: 0;
  display: grid;
  gap: 16px;
  padding: 111px 0 16px 0;
  box-sizing: border-box;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr 1.45fr;
}
.right-panel > :deep(.panel) {
  min-height: 0;
}
.panel {
  right: -500px;
  animation: entranceAnimation ease-in-out 0.75s forwards;
}
@keyframes entranceAnimation {
  0% {
    right: -500px;
  }
  100% {
    right: 0;
  }
}
</style>
