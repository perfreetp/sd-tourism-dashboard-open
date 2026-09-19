<!-- 实时告警 -->
<template>
  <CPanel>
    <template #header>
      <span>实时告警</span>
      <span v-if="criticalCount" class="header-badge header-badge--critical">{{ criticalCount }}</span>
      <span v-if="warningCount" class="header-badge header-badge--warning">{{ warningCount }}</span>
    </template>
    <template #content>
      <div class="alerts">
        <!-- 筛选与清空 -->
        <div class="alerts__toolbar">
          <span
            v-for="f in filters"
            :key="f.value"
            class="filter-tag"
            :class="{ active: filter === f.value }"
            @click="setFilter(f.value)"
          >
            {{ f.label }}
          </span>
          <span class="clear-btn" @click="clearAlerts">清空</span>
        </div>
        <!-- 告警列表 -->
        <div ref="listRef" class="alerts__list">
          <transition-group name="alert-item" tag="div">
            <div
              v-for="item in filteredAlerts"
              :key="item.id"
              class="alert-row"
              :class="'alert-row--' + item.level"
            >
              <div class="alert-row__head">
                <span class="alert-level" :class="'alert-level--' + item.level">
                  {{ item.level === 'critical' ? '严重' : '预警' }}
                </span>
                <span class="alert-time">{{ item.time }}</span>
                <span class="alert-del" @click="removeAlert(item.id)">×</span>
              </div>
              <div class="alert-row__body">
                <span class="alert-city">{{ item.city }}</span>
                <span class="alert-metric">{{ item.metric }}</span>
                <span class="alert-value">当前 {{ formatValue(item) }}</span>
              </div>
              <div class="alert-row__foot">
                阈值 {{ item.threshold }}{{ metricUnit(item.metric) }} ·
                <span :class="item.level === 'critical' ? 'over-critical' : 'over-warning'">
                  {{ exceedText(item) }}
                </span>
              </div>
            </div>
          </transition-group>
          <div v-if="!filteredAlerts.length" class="alerts__empty">暂无告警数据</div>
        </div>
      </div>
    </template>
  </CPanel>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import CPanel from '@/components/common/CPanel.vue'
import { useAlerts, type AlertFilter, type AlertItem } from '@/stores/alerts'

const {
  filteredAlerts,
  filter,
  warningCount,
  criticalCount,
  setFilter,
  removeAlert,
  clearAlerts
} = useAlerts()

const filters: { value: AlertFilter; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'critical', label: '严重' },
  { value: 'warning', label: '预警' }
]

const listRef = ref<HTMLElement | null>(null)

watch(
  () => filteredAlerts.value.length,
  async () => {
    await nextTick()
    const el = listRef.value
    if (el) el.scrollTop = 0
  }
)

const metricUnit = (metric: string) => (metric === '同比增速' ? '%' : metric === '旅游收入' ? '亿' : '万')

const formatValue = (item: AlertItem) => {
  const unit = item.metric === '同比增速' ? '%' : item.metric === '旅游收入' ? '亿元' : '万人次'
  return `${item.value}${unit}`
}

const exceedText = (item: AlertItem) =>
  item.metric === '同比增速'
    ? `低于阈值 ${item.exceed} 个百分点`
    : `超出阈值 ${item.exceed}%`
</script>

<style lang="scss" scoped>
.alerts {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 2px 0 4px;
  box-sizing: border-box;
  &__toolbar {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 6px;
  }
  &__list {
    flex: 1;
    overflow-y: auto;
    display: flex;
  flex-direction: column;
    gap: 5px;
    padding-right: 4px;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(218, 163, 88, 0.5);
      border-radius: 2px;
    }
    &::-webkit-scrollbar-track {
      background: rgba(40, 55, 95, 0.4);
    }
  }
  &__empty {
    margin: auto;
    font-size: 13px;
    color: rgba(159, 176, 214, 0.6);
  }
}
.filter-tag {
  padding: 2px 10px;
  font-size: 12px;
  border-radius: 10px;
  cursor: pointer;
  color: #9fb0d6;
  border: 1px solid rgba(109, 128, 175, 0.6);
  transition: all 0.2s ease;
  &:hover {
    color: #ffd36e;
    border-color: rgba(218, 163, 88, 0.8);
  }
  &.active {
    color: #2a1a00;
    background: linear-gradient(180deg, #ffd36e, #e09a37);
    border-color: transparent;
  }
}
.clear-btn {
  margin-left: auto;
  font-size: 12px;
  color: #9fb0d6;
  cursor: pointer;
  &:hover {
    color: #ff8a7a;
  }
}
.header-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  margin-left: 2px;
  border-radius: 9px;
  font-size: 12px;
  &--critical {
    background: rgba(247, 61, 75, 0.85);
    color: #fff;
  }
  &--warning {
    background: rgba(255, 177, 61, 0.9);
    color: #2a1a00;
  }
}
.alert-row {
  position: relative;
  padding: 4px 8px 5px 12px;
  border-radius: 4px;
  background: rgba(40, 55, 95, 0.45);
  border: 1px solid rgba(109, 128, 175, 0.25);
  font-size: 12px;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 6px;
    bottom: 6px;
    width: 3px;
    border-radius: 2px;
  }
  &--critical::before {
    background: #f73d4b;
    box-shadow: 0 0 8px rgba(247, 61, 75, 0.8);
  }
  &--warning::before {
    background: #ffb13d;
    box-shadow: 0 0 8px rgba(255, 177, 61, 0.7);
  }
  &__head {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  &__body {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 2px 0;
    color: #d7e2f5;
  }
  &__foot {
    color: #8fa0c4;
  }
}
.alert-level {
  padding: 0 6px;
  height: 16px;
  line-height: 16px;
  border-radius: 3px;
  font-size: 11px;
  &--critical {
    background: rgba(247, 61, 75, 0.2);
    color: #ff8a96;
    border: 1px solid rgba(247, 61, 75, 0.6);
  }
  &--warning {
    background: rgba(255, 177, 61, 0.18);
    color: #ffc978;
    border: 1px solid rgba(255, 177, 61, 0.6);
  }
}
.alert-time {
  color: #8fa0c4;
}
.alert-del {
  margin-left: auto;
  font-size: 15px;
  color: #7e8fB4;
  cursor: pointer;
  &:hover {
    color: #ff8a7a;
  }
}
.alert-city {
  color: #ffd36e;
  font-weight: 700;
}
.over-critical {
  color: #ff8a96;
}
.over-warning {
  color: #ffc978;
}
.alert-item-enter-active,
.alert-item-leave-active {
  transition: all 0.35s ease;
}
.alert-item-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.alert-item-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.alert-item-move {
  transition: transform 0.35s ease;
}
</style>
