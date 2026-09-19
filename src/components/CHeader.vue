<!-- 顶部标题 -->
<template>
  <header class="header">山东省旅游指标监控平台</header>
  <!-- 当前查看范围 + 自动巡览开关 -->
  <div class="view-bar">
    <transition name="scope-badge" mode="out-in">
      <div v-if="isProvince" key="province" class="scope-badge scope-badge--all">
        <span class="dot"></span>当前查看：全省总览
      </div>
      <div v-else key="city" class="scope-badge scope-badge--city">
        <span class="dot"></span>当前查看：{{ selectedCity }}
      </div>
    </transition>
    <div class="tour-switch" :class="{ 'is-on': autoTour }" @click="toggleAutoTour">
      <span class="tour-switch__label">自动巡览</span>
      <span class="tour-switch__track"><span class="tour-switch__thumb"></span></span>
    </div>
  </div>
  <!-- 文字轮播 -->
  <div class="text-carousel">
    <transition-group name="carousel" tag="div" class="carousel-container">
      <div class="text-carousel-item" :key="currentIndex" v-show="currentIndex === getCurrentItemIndex()">
        {{ getCurrentItem() }}
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useDashboard } from '@/stores/dashboard'

const { selectedCity, isProvince, autoTour, toggleAutoTour } = useDashboard()

// 轮播数据
const carouselData = ref([
  '济宁市微山湖旅游区达到国家5A级旅游景区标准要求，拟确定为国家5A级旅游景区!',
  '山东省文化和旅游厅发布《关于促进文化和旅游消费的若干措施》',
  '青岛市崂山风景区入选"中国最美旅游景区"榜单',
  '烟台市蓬莱阁景区推出夜游项目，游客体验度大幅提升',
  '威海市刘公岛景区新增海洋文化展览馆',
  '日照市万平口海滨风景区完成升级改造',
  '泰安市泰山景区推出智慧旅游服务系统',
  '临沂市蒙山景区举办"蒙山红叶节"活动',
  '淄博市周村古商城景区新增非遗文化展示区',
  '潍坊市青州古城景区推出沉浸式文化体验项目',
  '东营市黄河口生态旅游区举办观鸟节活动',
  '滨州市孙子兵法城景区新增军事文化体验项目',
  '德州市齐河欧乐堡景区推出亲子游主题活动',
  '聊城市东昌湖景区举办荷花节活动',
  '菏泽市牡丹园景区新增夜间灯光秀表演',
  '枣庄市台儿庄古城景区推出运河文化体验游',
  '济宁市曲阜三孔景区举办传统文化研学活动'
])

// 状态管理
const currentIndex = ref(0)
const timer = ref<number | null>(null)
const isAnimating = ref(false)
const isPaused = ref(false)

// 配置参数
const CONFIG = {
  INTERVAL: 5000, // 轮播间隔时间（毫秒）
  ANIMATION_DURATION: 500, // 动画持续时间（毫秒）
  DEBOUNCE_DELAY: 100 // 防抖延迟时间（毫秒）
}

// 获取当前显示的项目
const getCurrentItem = (): string => {
  if (carouselData.value.length === 0) return ''
  return carouselData.value[currentIndex.value]
}

// 获取当前项目索引（用于动画）
const getCurrentItemIndex = (): number => {
  return currentIndex.value
}

// 切换到下一项
const nextItem = (): void => {
  if (isAnimating.value || isPaused.value) return

  try {
    isAnimating.value = true

    setTimeout(() => {
      currentIndex.value = (currentIndex.value + 1) % carouselData.value.length
      isAnimating.value = false
    }, CONFIG.ANIMATION_DURATION)
  } catch (error) {
    console.error('轮播切换出错:', error)
    isAnimating.value = false
  }
}

// 启动轮播
const startCarousel = (): void => {
  if (timer.value) clearInterval(timer.value)
  timer.value = window.setInterval(() => {
    nextItem()
  }, CONFIG.INTERVAL)
}

onMounted(() => {
  // 启动轮播
  startCarousel()
})

onBeforeUnmount(() => {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
})
</script>

<style lang="scss" scoped>
.header {
  position: absolute;
  margin: 0 12px;
  top: 12px;
  width: calc(100% - 24px);
  height: 87px;
  background: url('@/assets/images/顶部标题.png') no-repeat center center;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: 800;
  letter-spacing: 12px;
  color: rgba(230, 239, 253);
}

.text-carousel {
  position: absolute;
  top: 160px;
  left: 50%;
  width: 744px;
  height: 43px;
  transform: translateX(-50%);
  background: linear-gradient(90deg, rgba(218, 163, 88, 0), rgba(218, 163, 88, 0.6), rgba(218, 163, 88, 0));
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  overflow: hidden;
  cursor: pointer;
  pointer-events: all;
  &:hover {
    background: linear-gradient(90deg, rgba(218, 163, 88, 0.1), rgba(218, 163, 88, 0.7), rgba(218, 163, 88, 0.1));
  }
}

.view-bar {
  position: absolute;
  top: 112px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 40;
  display: flex;
  align-items: center;
  gap: 18px;
}
.scope-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 30px;
  padding: 0 18px;
  font-size: 15px;
  letter-spacing: 1px;
  border-radius: 15px;
  border: 1px solid rgba(218, 163, 88, 0.7);
  background: rgba(20, 30, 60, 0.72);
  backdrop-filter: blur(2px);
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #58d3a0;
    box-shadow: 0 0 8px #58d3a0;
  }
  &--city {
    color: #ffd36e;
    border-color: rgba(255, 210, 120, 0.9);
    box-shadow: 0 0 14px rgba(218, 163, 88, 0.45);
    .dot {
      background: #ffb13d;
      box-shadow: 0 0 8px #ffb13d;
    }
  }
  &--all {
    color: #cfe0ff;
  }
}
.scope-badge-enter-active,
.scope-badge-leave-active {
  transition: all 0.3s ease;
}
.scope-badge-enter-from,
.scope-badge-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
.tour-switch {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 30px;
  padding: 0 14px;
  font-size: 14px;
  color: #c9d3ea;
  border-radius: 15px;
  border: 1px solid rgba(109, 128, 175, 0.7);
  background: rgba(20, 30, 60, 0.72);
  cursor: pointer;
  user-select: none;
  transition: all 0.25s ease;
  &:hover {
    border-color: rgba(218, 163, 88, 0.9);
  }
  &__track {
    position: relative;
    width: 38px;
    height: 18px;
    border-radius: 9px;
    background: rgba(92, 109, 152, 0.8);
    transition: background 0.25s ease;
  }
  &__thumb {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #d7e2f5;
    transition: all 0.25s ease;
  }
  &.is-on {
    color: #ffd36e;
    border-color: rgba(218, 163, 88, 0.9);
    box-shadow: 0 0 14px rgba(218, 163, 88, 0.35);
    .tour-switch__track {
      background: linear-gradient(90deg, #d39a45, #ffb13d);
    }
    .tour-switch__thumb {
      left: 22px;
      background: #fff6df;
    }
  }
}

.carousel-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.text-carousel-item {
  position: absolute;
  width: 100%;
  text-align: center;
  padding: 0 20px;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transform: translateY(0);
  opacity: 1;
}

// 轮播动画样式
.carousel-enter-active,
.carousel-leave-active {
  transition: all 0.5s ease-in-out;
}

.carousel-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.carousel-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

.carousel-enter-to,
.carousel-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
