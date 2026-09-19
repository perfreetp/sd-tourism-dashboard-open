<!-- 实时告警 -->
<template>
  <CPanel>
    <template #header>实时告警</template>
    <template #content>
      <div class="alarm-panel">
        <!-- 工具栏：级别筛选 + 清空 -->
        <div class="alarm-toolbar">
          <div class="filters">
            <span
              v-for="item in filterOptions"
              :key="item.value"
              class="filter-item"
              :class="{ active: dashboardStore.alarmFilter === item.value }"
              @click="dashboardStore.alarmFilter = item.value"
            >
              {{ item.label }}
            </span>
          </div>
          <span class="clear-btn" @click="clearAlarms">清空</span>
        </div>
        <!-- 告警列表 -->
        <div class="alarm-list" ref="listRef">
          <transition-group name="alarm">
            <div v-for="alarm in filteredAlarms" :key="alarm.id" class="alarm-item" :class="alarm.level">
              <div class="alarm-main">
                <span class="alarm-level">{{ levelText[alarm.level] }}</span>
                <span class="alarm-city">{{ alarm.city }}</span>
                <span class="alarm-indicator">{{ alarm.indicator }}超标</span>
                <span class="alarm-exceed">+{{ alarm.exceed }}%</span>
                <span class="alarm-delete" @click="removeAlarm(alarm.id)">×</span>
              </div>
              <div class="alarm-sub">
                <span>{{ alarm.time }}</span>
                <span>当前 {{ alarm.value }} / 阈值 {{ alarm.threshold }}</span>
              </div>
            </div>
          </transition-group>
          <div v-if="filteredAlarms.length === 0" class="alarm-empty">暂无告警</div>
        </div>
      </div>
    </template>
  </CPanel>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import CPanel from '@/components/common/CPanel.vue'
import { dashboardStore, removeAlarm, clearAlarms } from '@/store/dashboard'
import type { AlarmLevel } from '@/store/dashboard'

const filterOptions: { label: string; value: AlarmLevel | 'all' }[] = [
  { label: '全部', value: 'all' },
  { label: '高', value: 'high' },
  { label: '中', value: 'medium' },
  { label: '低', value: 'low' }
]

const levelText: Record<AlarmLevel, string> = {
  high: '高',
  medium: '中',
  low: '低'
}

const listRef = ref<HTMLElement | null>(null)

const filteredAlarms = computed(() =>
  dashboardStore.alarmFilter === 'all'
    ? dashboardStore.alarms
    : dashboardStore.alarms.filter(item => item.level === dashboardStore.alarmFilter)
)

// 新告警产生时自动滚动到最新一条
watch(
  () => dashboardStore.alarms.length,
  async () => {
    await nextTick()
    if (listRef.value) {
      listRef.value.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
)
</script>

<style lang="scss" scoped>
.alarm-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 8px;
  padding-top: 4px;
  box-sizing: border-box;
}
.alarm-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .filters {
    display: flex;
    gap: 8px;
    .filter-item {
      padding: 2px 12px;
      font-size: 13px;
      color: rgba(201, 211, 234, 0.8);
      border: 1px solid rgba(138, 165, 219, 0.4);
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.3s;
      &.active {
        color: #fff;
        background: rgba(218, 163, 88, 0.5);
        border-color: rgba(218, 163, 88, 1);
      }
    }
  }
  .clear-btn {
    font-size: 13px;
    color: rgba(247, 61, 75, 0.9);
    cursor: pointer;
    &:hover {
      color: rgba(247, 61, 75, 1);
      text-shadow: 0 0 8px rgba(247, 61, 75, 0.6);
    }
  }
}
.alarm-list {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
.alarm-item {
  padding: 6px 10px;
  margin-bottom: 6px;
  border-radius: 4px;
  background: linear-gradient(90deg, rgba(92, 109, 152, 0.5), rgba(92, 109, 152, 0.1));
  border-left: 3px solid rgba(138, 165, 219, 0.8);
  &.high {
    border-left-color: rgba(247, 61, 75, 1);
    .alarm-level {
      background: rgba(247, 61, 75, 0.9);
    }
  }
  &.medium {
    border-left-color: rgba(244, 168, 65, 1);
    .alarm-level {
      background: rgba(244, 168, 65, 0.9);
    }
  }
  &.low {
    border-left-color: rgba(11, 212, 167, 1);
    .alarm-level {
      background: rgba(11, 212, 167, 0.9);
    }
  }
  .alarm-main {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    .alarm-level {
      padding: 0 6px;
      border-radius: 3px;
      font-size: 12px;
      color: #fff;
    }
    .alarm-city {
      color: #fff;
    }
    .alarm-indicator {
      color: rgba(201, 211, 234, 1);
    }
    .alarm-exceed {
      color: rgba(247, 61, 75, 1);
      font-weight: 700;
    }
    .alarm-delete {
      margin-left: auto;
      color: rgba(201, 211, 234, 0.6);
      cursor: pointer;
      font-size: 15px;
      &:hover {
        color: #fff;
      }
    }
  }
  .alarm-sub {
    display: flex;
    justify-content: space-between;
    margin-top: 2px;
    font-size: 12px;
    color: rgba(201, 211, 234, 0.6);
  }
}
.alarm-empty {
  padding-top: 40px;
  text-align: center;
  font-size: 14px;
  color: rgba(201, 211, 234, 0.5);
}
// 列表过渡动画
.alarm-enter-active,
.alarm-leave-active {
  transition: all 0.4s ease;
}
.alarm-enter-from {
  opacity: 0;
  transform: translateY(-12px);
}
.alarm-leave-to {
  opacity: 0;
  transform: translateX(24px);
}
.alarm-move {
  transition: transform 0.4s ease;
}
</style>
