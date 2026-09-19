import { computed } from 'vue'
import { cityDataMap, getCityHotWords, provinceData } from '@/assets/data/cityData'
import { useDashboard } from '@/stores/dashboard'
import type { HotWord, ScenicSpot } from '@/types/data'

export interface TopBarDatum {
  name: string
  value: number
}

// 统一封装“全省 / 城市”两种范围下各面板所需数据
export function useDashboardData() {
  const { selectedCity } = useDashboard()

  const city = computed(() => (selectedCity.value ? cityDataMap[selectedCity.value] : null))
  const scopeName = computed(() => (city.value ? city.value.name : '全省'))

  const visitors = computed(() => (city.value ? city.value.visitors : provinceData.visitors))
  const revenue = computed(() => (city.value ? city.value.revenue : provinceData.revenue))
  const growth = computed(() => (city.value ? city.value.growth : provinceData.growth))
  const outbound = computed(() =>
    city.value ? +(city.value.revenue * 0.072).toFixed(1) : provinceData.outbound
  )

  const monthly2021 = computed(() =>
    city.value ? city.value.monthly2021 : provinceData.monthly2021
  )
  const monthly2022 = computed(() =>
    city.value ? city.value.monthly2022 : provinceData.monthly2022
  )
  const ageDist = computed(() => (city.value ? city.value.ageDist : provinceData.ageDist))
  const industry = computed(() => (city.value ? city.value.industry : provinceData.industry))

  // 景点人流排名
  const spotRanking = computed<ScenicSpot[]>(() => {
    if (city.value) return city.value.spots.slice().sort((a, b) => b.value - a.value)
    return provinceData.topSpots
  })

  // TOP5：全省展示城市接待量；城市内展示该城市景点热度
  const top5 = computed<TopBarDatum[]>(() => {
    if (city.value) {
      return city.value.spots
        .slice()
        .sort((a, b) => b.value - a.value)
        .slice(0, 5)
        .map((s) => ({ name: s.name, value: s.value }))
    }
    return provinceData.topCities.slice(0, 5).map((c) => ({ name: c.name, value: c.visitors }))
  })

  const hotWords = computed<HotWord[]>(() =>
    city.value ? getCityHotWords(city.value.name) : provinceData.hotWords
  )

  const topSpots3 = computed<ScenicSpot[]>(() =>
    (city.value ? city.value.spots : provinceData.topSpots).slice(0, 3)
  )

  return {
    selectedCity,
    isProvince: computed(() => selectedCity.value === null),
    city,
    scopeName,
    visitors,
    revenue,
    growth,
    outbound,
    monthly2021,
    monthly2022,
    ageDist,
    industry,
    spotRanking,
    top5,
    hotWords,
    topSpots3
  }
}
