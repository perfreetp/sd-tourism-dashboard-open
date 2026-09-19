<!-- 景点人流排名 -->
<template>
  <CPanel>
    <template #header>{{ scopeName }}景点人流排名</template>
    <template #content>
      <vue3ScrollSeamless
        :key="scopeName"
        :dataList="list"
        class="list"
        :class-option="{
          limitMoveNum: 5
        }"
      >
        <div class="list-warpper">
          <article class="list__item" v-for="(item, index) in list" :key="item.label + index">
            <section class="item__index">{{ 'NO.' + (index + 1) }}</section>
            <section class="item__label">{{ item.label }}</section>
            <!-- 进度条 -->
            <div class="progress">
              <span class="progress__conent" :style="{ left: getProgressValue(item.value) }"></span>
            </div>
          </article>
        </div>
      </vue3ScrollSeamless>
    </template>
  </CPanel>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { vue3ScrollSeamless } from 'vue3-scroll-seamless'
import CPanel from '@/components/common/CPanel.vue'
import { useDashboardData } from '@/composables/useDashboardData'

const { scopeName, spotRanking } = useDashboardData()

const list = computed(() => spotRanking.value.map((s) => ({ label: s.name, value: s.value })))
const maxValue = computed(() => Math.max(...list.value.map((i) => i.value), 1))

// 计算进度
const getProgressValue = (value: number) => {
  return -((maxValue.value - value) / maxValue.value) * 100 + '%'
}
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
      width: 130px;
      height: 100%;
      line-height: 40px;
      overflow: hidden;
      color: rgba(201, 211, 234, 1);
      white-space: nowrap;
      text-overflow: ellipsis;
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
        transition: left 0.6s cubic-bezier(0.22, 1, 0.36, 1);
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
