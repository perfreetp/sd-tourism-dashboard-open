// 大屏全局状态：城市选中、自动巡览、实时告警
import { reactive, computed } from 'vue'
import { cityNames, getMetric } from '@/assets/data/cityData'

export type AlarmLevel = 'high' | 'medium' | 'low'

export interface Alarm {
  id: number
  time: string
  city: string
  indicator: string
  value: string
  threshold: string
  exceed: number
  level: AlarmLevel
}

// 指标阈值
const THRESHOLDS = [
  { key: 'tourists', indicator: '接待人次', value: 100, unit: '万人' },
  { key: 'revenue', indicator: '旅游收入', value: 2000, unit: '万元' },
  { key: 'growth', indicator: '同比增速', value: 10, unit: '%' }
] as const

const MAX_ALARMS = 20
const TOUR_INTERVAL = 5000

export const dashboardStore = reactive({
  selectedCity: null as string | null,
  autoTour: false,
  alarms: [] as Alarm[],
  alarmFilter: 'all' as AlarmLevel | 'all'
})

export const currentViewName = computed(() => dashboardStore.selectedCity || '山东省')

let alarmId = 0
let tourTimer: number | null = null

const now = () => new Date().toLocaleTimeString('zh-CN', { hour12: false })

// 评估城市指标，超阈值生成告警
const evaluateAlarms = (cityName: string) => {
  const metric = getMetric(cityName)
  THRESHOLDS.forEach(item => {
    const value = metric[item.key as 'tourists' | 'revenue' | 'growth']
    if (value > item.value) {
      const exceed = +(((value - item.value) / item.value) * 100).toFixed(1)
      const level: AlarmLevel = exceed > 30 ? 'high' : exceed > 15 ? 'medium' : 'low'
      dashboardStore.alarms.unshift({
        id: ++alarmId,
        time: now(),
        city: cityName,
        indicator: item.indicator,
        value: `${value}${item.unit}`,
        threshold: `${item.value}${item.unit}`,
        exceed,
        level
      })
    }
  })
  if (dashboardStore.alarms.length > MAX_ALARMS) {
    dashboardStore.alarms.length = MAX_ALARMS
  }
}

// 选中城市（再次点击同一城市则返回全省）
export const selectCity = (cityName: string) => {
  if (dashboardStore.selectedCity === cityName) {
    clearSelection()
    return
  }
  dashboardStore.selectedCity = cityName
  evaluateAlarms(cityName)
}

// 返回全省总览（同时停止自动巡览）
export const clearSelection = () => {
  dashboardStore.selectedCity = null
  stopAutoTour()
}

// 切换到下一城市
export const selectNextCity = () => {
  const currentIndex = dashboardStore.selectedCity ? cityNames.indexOf(dashboardStore.selectedCity) : -1
  selectCity(cityNames[(currentIndex + 1) % cityNames.length])
}

export const startAutoTour = () => {
  if (tourTimer) return
  dashboardStore.autoTour = true
  selectNextCity()
  tourTimer = window.setInterval(selectNextCity, TOUR_INTERVAL)
}

export const stopAutoTour = () => {
  dashboardStore.autoTour = false
  if (tourTimer) {
    clearInterval(tourTimer)
    tourTimer = null
  }
}

export const toggleAutoTour = () => {
  dashboardStore.autoTour ? stopAutoTour() : startAutoTour()
}

export const removeAlarm = (id: number) => {
  const index = dashboardStore.alarms.findIndex(item => item.id === id)
  if (index > -1) dashboardStore.alarms.splice(index, 1)
}

export const clearAlarms = () => {
  dashboardStore.alarms.splice(0)
}
