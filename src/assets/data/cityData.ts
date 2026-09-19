// 山东省16地市旅游数据
import sdData from '@/assets/data/山东省'

export interface CityMetric {
  name: string
  // 接待人次（万人）
  tourists: number
  // 旅游收入（万元）
  revenue: number
  // 人口出游支出（万元）
  spending: number
  // 同比增速（%）
  growth: number
  // 热门景点
  spots: { label: string; value: number }[]
}

export const cityMetrics: CityMetric[] = [
  { name: '济南市', tourists: 105, revenue: 2250, spending: 1480, growth: 8.6, spots: [{ label: '趵突泉', value: 12.6 }, { label: '千佛山', value: 10.8 }, { label: '大明湖', value: 9.4 }] },
  { name: '青岛市', tourists: 128, revenue: 2680, spending: 1720, growth: 11.2, spots: [{ label: '栈桥', value: 14.2 }, { label: '崂山风景区', value: 12.8 }, { label: '八大关', value: 8.6 }] },
  { name: '淄博市', tourists: 38, revenue: 760, spending: 520, growth: 12.8, spots: [{ label: '周村古商城', value: 8.3 }, { label: '齐文化博物院', value: 5.1 }, { label: '潭溪山', value: 4.2 }] },
  { name: '枣庄市', tourists: 16, revenue: 320, spending: 230, growth: 6.4, spots: [{ label: '台儿庄古城', value: 11.0 }, { label: '微山湖红荷湿地', value: 3.6 }, { label: '抱犊崮', value: 2.1 }] },
  { name: '东营市', tourists: 14, revenue: 290, spending: 210, growth: 5.2, spots: [{ label: '黄河口生态旅游区', value: 6.8 }, { label: '孙子文化园', value: 2.4 }, { label: '揽翠湖', value: 1.5 }] },
  { name: '烟台市', tourists: 78, revenue: 1620, spending: 1060, growth: 9.1, spots: [{ label: '蓬莱阁', value: 10.7 }, { label: '长岛', value: 7.9 }, { label: '烟台山', value: 5.6 }] },
  { name: '潍坊市', tourists: 62, revenue: 1180, spending: 810, growth: 7.3, spots: [{ label: '青州古城', value: 9.2 }, { label: '沂山风景区', value: 5.8 }, { label: '十笏园', value: 3.4 }] },
  { name: '济宁市', tourists: 52, revenue: 1020, spending: 700, growth: 8.1, spots: [{ label: '曲阜三孔', value: 10.4 }, { label: '微山湖旅游区', value: 6.7 }, { label: '水泊梁山', value: 4.3 }] },
  { name: '泰安市', tourists: 45, revenue: 980, spending: 640, growth: 10.6, spots: [{ label: '泰山', value: 15.6 }, { label: '岱庙', value: 5.2 }, { label: '方特欢乐世界', value: 4.8 }] },
  { name: '威海市', tourists: 48, revenue: 1060, spending: 690, growth: 9.8, spots: [{ label: '刘公岛', value: 9.8 }, { label: '成山头', value: 6.1 }, { label: '华夏城', value: 4.5 }] },
  { name: '日照市', tourists: 33, revenue: 660, spending: 450, growth: 8.9, spots: [{ label: '万平口风景区', value: 7.8 }, { label: '五莲山', value: 4.2 }, { label: '东夷小镇', value: 3.9 }] },
  { name: '临沂市', tourists: 58, revenue: 1090, spending: 760, growth: 7.7, spots: [{ label: '蒙山', value: 8.5 }, { label: '竹泉村', value: 5.3 }, { label: '王羲之故居', value: 3.1 }] },
  { name: '德州市', tourists: 28, revenue: 540, spending: 380, growth: 6.1, spots: [{ label: '齐河欧乐堡', value: 6.4 }, { label: '董子园', value: 3.7 }, { label: '苏禄王墓', value: 1.8 }] },
  { name: '聊城市', tourists: 22, revenue: 430, spending: 300, growth: 5.6, spots: [{ label: '东昌湖', value: 6.9 }, { label: '光岳楼', value: 3.2 }, { label: '景阳冈', value: 2.6 }] },
  { name: '滨州市', tourists: 18, revenue: 350, spending: 250, growth: 4.8, spots: [{ label: '孙子兵法城', value: 5.2 }, { label: '中海公园', value: 4.2 }, { label: '魏氏庄园', value: 2.3 }] },
  { name: '菏泽市', tourists: 25, revenue: 480, spending: 340, growth: 6.9, spots: [{ label: '曹州牡丹园', value: 7.6 }, { label: '水浒好汉城', value: 4.1 }, { label: '浮龙湖', value: 2.8 }] }
]

// 城市经纬度（取自地图 GeoJSON 质心）
export const cityPoints: Record<string, number[]> = {}
;(sdData as any).features.forEach((f: any) => {
  cityPoints[f.properties.name] = f.properties.centroid || f.properties.center
})

export const cityNames: string[] = cityMetrics.map(item => item.name)

// 全省汇总
export const provinceMetric: CityMetric = {
  name: '山东省',
  tourists: +cityMetrics.reduce((sum, item) => sum + item.tourists, 0).toFixed(1),
  revenue: +cityMetrics.reduce((sum, item) => sum + item.revenue, 0).toFixed(1),
  spending: +cityMetrics.reduce((sum, item) => sum + item.spending, 0).toFixed(1),
  growth: 8.4,
  spots: []
}

// 基于城市名生成稳定的伪随机序列，保证同一城市数据恒定
const hashCode = (text: string): number => {
  let hash = 0
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 31 + text.charCodeAt(i)) | 0
  }
  return Math.abs(hash)
}
const seededRandom = (seed: number) => {
  let value = seed
  return () => {
    value = (value * 9301 + 49297) % 233280
    return value / 233280
  }
}

export interface CityPanelData {
  ageDistribution: number[]
  industryRevenue: number[]
  monthly2021: number[]
  monthly2022: number[]
  hotWords: { name: string; value: number; position: number[] }[]
  scenicRanking: { label: string; value: number }[]
  top5: { names: string[]; values: number[] }
}

const AGE_BASE = [2000, 1430, 800, 410, 120]
const INDUSTRY_BASE = [100, 200, 300, 400, 500, 600, 700]
const MONTH_2021_BASE = [23, 60, 20, 36, 23, 85, 70, 60, 78, 89, 68, 56]
const MONTH_2022_BASE = [145, 78, 88, 99, 36, 109, 120, 150, 99, 89, 100, 120]
const WORD_POSITIONS = [
  [50, 50], [10, 30], [85, 80], [27, 55], [68, 17], [20, 90], [35, 20], [65, 89], [90, 40]
]
const WORD_POOL = ['海边', '人多', '孔子', '老师儿', '热情', '豪爽', '大葱', '美食', '泰山', '泉水', '烧烤', '古城', '沙滩', '日出', '风筝', '牡丹']
const GENERIC_SPOTS = ['海滨浴场', '森林公园', '湿地公园', '文化广场', '主题乐园', '温泉度假区', '生态农庄', '博物馆']

const panelDataCache: Record<string, CityPanelData> = {}

// 生成指定城市的面板数据（确定性，随城市切换保持稳定）
export const getCityPanelData = (cityName: string): CityPanelData => {
  if (panelDataCache[cityName]) return panelDataCache[cityName]
  const metric = cityMetrics.find(item => item.name === cityName)
  if (!metric) return getProvincePanelData()
  const random = seededRandom(hashCode(cityName))
  const scale = metric.tourists / 128 // 以青岛为基准缩放
  const jitter = (range: number) => 1 + (random() - 0.5) * range

  const ageDistribution = AGE_BASE.map(value => Math.round(value * scale * jitter(0.2)))
  const industryRevenue = INDUSTRY_BASE.map(value => Math.round(value * scale * jitter(0.3)))
  const monthly2021 = MONTH_2021_BASE.map(value => Math.round(value * scale * jitter(0.3)))
  const monthly2022 = MONTH_2022_BASE.map(value => Math.round(value * scale * jitter(0.3)))

  const spotWords = metric.spots.map(spot => spot.label.replace(/风景区|旅游区/g, ''))
  const wordPool = WORD_POOL.filter(word => !spotWords.includes(word))
  const wordStart = Math.floor(random() * wordPool.length)
  const hotWords = WORD_POSITIONS.map((position, index) => {
    const word = wordPool[(wordStart + index) % wordPool.length]
    return {
      name: index < 2 && spotWords[index] ? spotWords[index] : word,
      value: Math.max(2, Math.round((index === 0 ? 18 : 4 + random() * 12) * jitter(0.3))),
      position
    }
  })

  const genericStart = Math.floor(random() * GENERIC_SPOTS.length)
  const scenicRanking = [
    ...metric.spots,
    ...[0, 1, 2].map(index => ({
      label: metric.name.replace('市', '') + GENERIC_SPOTS[(genericStart + index) % GENERIC_SPOTS.length],
      value: +(1 + random() * 3).toFixed(1)
    }))
  ].sort((a, b) => b.value - a.value)

  const top5 = {
    names: scenicRanking.slice(0, 5).map(item => item.label),
    values: scenicRanking.slice(0, 5).map(item => Math.round(item.value * 10))
  }

  const data: CityPanelData = { ageDistribution, industryRevenue, monthly2021, monthly2022, hotWords, scenicRanking, top5 }
  panelDataCache[cityName] = data
  return data
}

// 全省面板数据（保持原有展示口径）
export const getProvincePanelData = (): CityPanelData => {
  if (panelDataCache['山东省']) return panelDataCache['山东省']
  const sorted = [...cityMetrics].sort((a, b) => b.tourists - a.tourists)
  const data: CityPanelData = {
    ageDistribution: AGE_BASE,
    industryRevenue: INDUSTRY_BASE,
    monthly2021: MONTH_2021_BASE,
    monthly2022: MONTH_2022_BASE,
    hotWords: [
      { name: '海边', value: 19, position: [50, 50] },
      { name: '人多', value: 4, position: [10, 30] },
      { name: '孔子', value: 8, position: [85, 80] },
      { name: '老师儿', value: 2, position: [27, 55] },
      { name: '热情', value: 6, position: [68, 17] },
      { name: '豪爽', value: 7, position: [20, 90] },
      { name: '大葱', value: 5, position: [35, 20] },
      { name: '美食', value: 4, position: [65, 89] },
      { name: '泰山', value: 16, position: [90, 40] }
    ],
    scenicRanking: [],
    top5: {
      names: sorted.slice(0, 5).map(item => item.name),
      values: sorted.slice(0, 5).map(item => item.tourists)
    }
  }
  panelDataCache['山东省'] = data
  return data
}

// 获取指标数据（全省或城市）
export const getMetric = (cityName: string | null): CityMetric => {
  if (!cityName) return provinceMetric
  return cityMetrics.find(item => item.name === cityName) || provinceMetric
}
