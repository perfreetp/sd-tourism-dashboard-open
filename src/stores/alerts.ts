import { computed, ref } from 'vue'
import type { CityData } from '@/types/data'

export type AlertLevel = 'critical' | 'warning'
export type AlertFilter = 'all' | AlertLevel

export interface AlertItem {
  id: number
  time: string
  city: string
  metric: string
  level: AlertLevel
  value: number
  threshold: number
  exceed: number // 超标幅度（百分点 / %）
}

export interface MetricThreshold {
  key: 'visitors' | 'revenue' | 'growth'
  metric: string
  unit: string
  // 高于 high 触发严重；低于 low 触发预警（增速下行）
  high?: number
  low?: number
  direction: 'up' | 'down'
}

// 告警阈值
export const METRIC_THRESHOLDS: MetricThreshold[] = [
  { key: 'visitors', metric: '接待人次', unit: '万人次', high: 100, direction: 'up' },
  { key: 'revenue', metric: '旅游收入', unit: '亿元', high: 12, direction: 'up' },
  { key: 'growth', metric: '同比增速', unit: '%', low: -5, direction: 'down' }
]

const MAX_ALERTS = 20
const alerts = ref<AlertItem[]>([])
const filter = ref<AlertFilter>('all')
let seq = 0

function formatTime(d = new Date()) {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
}

// 依据城市指标生成告警（同一城市+指标+级别只保留最新一条）
export function evaluateCity(city: CityData) {
  METRIC_THRESHOLDS.forEach((t) => {
    const value = city[t.key]
    let level: AlertLevel | null = null
    let threshold = 0
    if (t.direction === 'up' && t.high !== undefined && value > t.high) {
      level = value > t.high * 1.1 ? 'critical' : 'warning'
      threshold = t.high
    }
    if (t.direction === 'down' && t.low !== undefined && value < t.low) {
      level = value < t.low * 1.4 ? 'critical' : 'warning'
      threshold = t.low
    }
    if (!level) return
    // 去重：同城市+指标+级别已存在则不重复生成
    const existed = alerts.value.some(
      (a) => a.city === city.name && a.metric === t.metric && a.level === level
    )
    if (existed) return
    const exceed =
      t.direction === 'up'
        ? +(((value - threshold) / threshold) * 100).toFixed(1)
        : +Math.abs(value - threshold).toFixed(1)
    alerts.value.unshift({
      id: ++seq,
      time: formatTime(),
      city: city.name,
      metric: t.metric,
      level,
      value,
      threshold,
      exceed
    })
  })
  if (alerts.value.length > MAX_ALERTS) {
    alerts.value = alerts.value.slice(0, MAX_ALERTS)
  }
}

export function useAlerts() {
  const filteredAlerts = computed(() =>
    filter.value === 'all' ? alerts.value : alerts.value.filter((a) => a.level === filter.value)
  )
  const warningCount = computed(() => alerts.value.filter((a) => a.level === 'warning').length)
  const criticalCount = computed(() => alerts.value.filter((a) => a.level === 'critical').length)

  function setFilter(f: AlertFilter) {
    filter.value = f
  }
  function removeAlert(id: number) {
    alerts.value = alerts.value.filter((a) => a.id !== id)
  }
  function clearAlerts() {
    alerts.value = []
  }
  return {
    alerts,
    filteredAlerts,
    filter,
    warningCount,
    criticalCount,
    setFilter,
    removeAlert,
    clearAlerts
  }
}
