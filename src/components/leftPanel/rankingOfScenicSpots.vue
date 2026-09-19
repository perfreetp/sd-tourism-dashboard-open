<!-- 景点人流排名 -->
<template>
  <CPanel>
    <template #header>景点人流排名</template>
    <template #content>
      <vue3ScrollSeamless
        :key="currentViewName"
        :dataList="list"
        class="list"
        :class-option="{
          limitMoveNum: 5
        }"
      >
        <div class="list-warpper">
          <article class="list__item" v-for="(item, index) in list" :key="useId() + index">
            <section class="item__index">{{ 'NO.' + (index + 1) }}</section>
            <section class="item__label">{{ item.label }}</section>
            <!-- 进度条 -->
            <div class="progress">
              <span
                class="progress__conent"
                :style="{
                  left: getProgressValue(item.value)
                }"
              ></span>
            </div>
          </article>
        </div>
      </vue3ScrollSeamless>
    </template>
  </CPanel>
</template>

<script setup lang="ts">
import { vue3ScrollSeamless } from 'vue3-scroll-seamless'
import CPanel from '@/components/common/CPanel.vue'
import { ref, useId, watch } from 'vue'
import { rankingOfScenicSpots } from '@/assets/data/人流排名'
import { dashboardStore, currentViewName } from '@/store/dashboard'
import { getCityPanelData } from '@/assets/data/cityData'

const list = ref<{ label: string; value: number }[]>([])
const maxValue = ref(0)

// 计算进度
const getProgressValue = (value: number) => {
  return -((maxValue.value - value) / maxValue.value) * 100 + '%'
}

const loadData = () => {
  const source = dashboardStore.selectedCity
    ? getCityPanelData(dashboardStore.selectedCity).scenicRanking
    : rankingOfScenicSpots
  list.value = [...source].sort((a, b) => b.value - a.value)
  maxValue.value = source.reduce((acc, item) => acc + item.value, 0)
}

watch(() => dashboardStore.selectedCity, loadData, { immediate: true })
</script>
<style lang="scss" scoped>
.list {
  max-height: 200px;
  outline: none;
  overflow: hidden;
  &__item {
    position: relative;
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    gap: 28px;
    padding: 0 12px 0 24px;
    box-sizing: border-box;
    font-size: 14px;
    &:nth-of-type(even) {
      background: linear-gradient(90deg, rgba(92, 109, 152, 0.8), rgba(92, 109, 152, 0));
    }
    .item__index {
      width: 30px;
      color: rgba(244, 168, 65, 1);
    }
    .item__label {
      width: 100px;
      height: 100%;
      line-height: 40px;
      overflow: hidden;
      color: rgba(201, 211, 234, 1);
    }
    .progress {
      position: relative;
      width: 156px;
      height: 5px;
      background: rgba(100, 110, 132, 1);
      overflow: hidden;
      .progress__conent {
        position: absolute;
        left: -100%;
        height: 100%;
        width: 100%;
        background: linear-gradient(90deg, #ffa832, #f8c47d);
        transition: left 0.6s ease;
      }
    }
  }
}
.warp {
  height: 270px;
  width: 360px;
  margin: 0 auto;
  overflow: hidden;
}
</style>
