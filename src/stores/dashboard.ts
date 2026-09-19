import { computed, ref } from 'vue'
import { CITY_ORDER } from '@/assets/data/cityData'

// 当前选中城市，null 表示全省总览
const selectedCity = ref<string | null>(null)
// 自动巡览开关
const autoTour = ref(false)
let tourTimer: number | null = null

export function useDashboard() {
  const isProvince = computed(() => selectedCity.value === null)

  function selectCity(name: string | null) {
    if (name !== null && !CITY_ORDER.includes(name)) return
    selectedCity.value = name
  }

  // 点击地图区域/柱子：选中新城市；再次点击已选城市则返回全省
  function toggleCity(name: string) {
    selectedCity.value = selectedCity.value === name ? null : name
  }

  function backToProvince() {
    selectedCity.value = null
    stopAutoTour()
  }

  function nextCity() {
    const idx = selectedCity.value ? CITY_ORDER.indexOf(selectedCity.value) : -1
    selectedCity.value = CITY_ORDER[(idx + 1) % CITY_ORDER.length]
  }

  function startAutoTour() {
    autoTour.value = true
    if (tourTimer !== null) return
    tourTimer = window.setInterval(nextCity, 5000)
  }

  function stopAutoTour() {
    autoTour.value = false
    if (tourTimer !== null) {
      clearInterval(tourTimer)
      tourTimer = null
    }
  }

  function toggleAutoTour() {
    if (autoTour.value) stopAutoTour()
    else startAutoTour()
  }

  return {
    selectedCity,
    autoTour,
    isProvince,
    selectCity,
    toggleCity,
    backToProvince,
    nextCity,
    startAutoTour,
    stopAutoTour,
    toggleAutoTour
  }
}
