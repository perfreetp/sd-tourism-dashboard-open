import type { CityData, HotWord, ScenicSpot } from '@/types/data'

// 16 地市基础数据：visitors 接待（万人次）、revenue 收入（亿元）、
// growth 同比（%）、spots 热门景点热度（万人次）
interface RawCity {
  name: string
  point: [number, number]
  visitors: number
  revenue: number
  growth: number
  spots: { name: string; value: number }[]
  words: string[]
}

export const CITY_ORDER = [
  '济南市',
  '青岛市',
  '淄博市',
  '枣庄市',
  '东营市',
  '烟台市',
  '潍坊市',
  '济宁市',
  '泰安市',
  '威海市',
  '日照市',
  '临沂市',
  '德州市',
  '聊城市',
  '滨州市',
  '菏泽市'
]

export const rawCityList: RawCity[] = [
  {
    name: '济南市',
    point: [117.221211, 36.640013],
    visitors: 198.6,
    revenue: 26.8,
    growth: 5.8,
    spots: [
      { name: '济南千佛山', value: 13.6 },
      { name: '天下第一泉', value: 11.2 },
      { name: '大明湖', value: 9.4 },
      { name: '济南野生动物世界', value: 4.1 }
    ],
    words: ['泉水', '老舍', '把子肉', '超然楼', '老师儿']
  },
  {
    name: '青岛市',
    point: [120.150883, 36.451227],
    visitors: 267.3,
    revenue: 38.4,
    growth: 7.2,
    spots: [
      { name: '青岛栈桥', value: 16.8 },
      { name: '崂山风景区', value: 14.5 },
      { name: '金沙滩', value: 10.2 },
      { name: '八大关', value: 8.6 }
    ],
    words: ['海边', '啤酒', '崂山', '帆船', '栈桥']
  },
  {
    name: '淄博市',
    point: [118.058673, 36.610971],
    visitors: 112.4,
    revenue: 13.2,
    growth: 24.6,
    spots: [
      { name: '淄博周村古商城', value: 9.3 },
      { name: '淄博陶瓷琉璃馆', value: 6.8 },
      { name: '潭溪山', value: 5.2 },
      { name: '原山森林公园', value: 3.4 }
    ],
    words: ['烧烤', '陶瓷', '琉璃', '齐文化', '撸串']
  },
  {
    name: '枣庄市',
    point: [117.39817, 34.916234],
    visitors: 78.9,
    revenue: 8.6,
    growth: 6.4,
    spots: [
      { name: '枣庄台儿庄古城', value: 11.0 },
      { name: '微山湖红荷湿地', value: 5.6 },
      { name: '抱犊崮', value: 3.1 },
      { name: '熊耳山', value: 2.2 }
    ],
    words: ['古城', '运河', '石榴', '辣子鸡', '微山湖']
  }
  ,
  {
    name: '东营市',
    point: [118.64357, 37.639575],
    visitors: 56.2,
    revenue: 6.4,
    growth: -5.2,
    spots: [
      { name: '东营黄河口生态旅游区', value: 5.1 },
      { name: '孙子文化旅游区', value: 3.2 },
      { name: '天鹅湖', value: 2.4 },
      { name: '清风湖', value: 1.5 }
    ],
    words: ['黄河入海口', '湿地', '观鸟', '石油', '天鹅']
  },
  {
    name: '烟台市',
    point: [120.804685, 37.241819],
    visitors: 172.8,
    revenue: 22.7,
    growth: 4.1,
    spots: [
      { name: '烟台蓬莱阁', value: 12.7 },
      { name: '烟台山', value: 9.8 },
      { name: '长岛', value: 8.4 },
      { name: '金沙滩海滨公园', value: 6.1 }
    ],
    words: ['仙境', '苹果', '海鲜', '蓬莱', '海岛']
  },
  {
    name: '潍坊市',
    point: [119.077723, 36.554349],
    visitors: 107.5,
    revenue: 12.9,
    growth: 3.6,
    spots: [
      { name: '潍坊青州古城', value: 8.9 },
      { name: '潍坊十笏园', value: 5.4 },
      { name: '沂山风景区', value: 4.7 },
      { name: '金宝乐园', value: 3.2 }
    ],
    words: ['风筝', '年画', '青州', '蔬菜', '古城']
  },
  {
    name: '济宁市',
    point: [116.740918, 35.371173],
    visitors: 132.4,
    revenue: 16.1,
    growth: -9.4,
    spots: [
      { name: '曲阜三孔', value: 13.2 },
      { name: '微山湖旅游区', value: 7.8 },
      { name: '水泊梁山', value: 5.4 },
      { name: '太白湖', value: 3.6 }
    ],
    words: ['孔子', '三孔', '运河', '梁山', '微山湖']
  }
  ,
  {
    name: '泰安市',
    point: [117.030841, 36.002274],
    visitors: 158.7,
    revenue: 20.3,
    growth: 6.8,
    spots: [
      { name: '泰安泰山', value: 18.4 },
      { name: '岱庙', value: 7.6 },
      { name: '太阳部落', value: 4.2 },
      { name: '天颐湖', value: 3.1 }
    ],
    words: ['泰山', '日出', '封禅', '挑山工', '登山']
  },
  {
    name: '威海市',
    point: [122.000805, 37.118677],
    visitors: 126.3,
    revenue: 17.5,
    growth: 2.3,
    spots: [
      { name: '威海刘公岛', value: 11.8 },
      { name: '成山头', value: 8.2 },
      { name: '那香海', value: 6.7 },
      { name: '华夏城', value: 5.3 }
    ],
    words: ['刘公岛', '海滨', '干净', '海鲜', '天鹅']
  },
  {
    name: '日照市',
    point: [119.146546, 35.57855],
    visitors: 94.6,
    revenue: 10.8,
    growth: -1.8,
    spots: [
      { name: '日照万平口海滨风景区', value: 9.8 },
      { name: '五莲山', value: 5.6 },
      { name: '东夷小镇', value: 4.9 },
      { name: '海洋公园', value: 3.7 }
    ],
    words: ['赶海', '日出', '海鲜', '沙滩', '渔家']
  },
  {
    name: '临沂市',
    point: [118.286421, 35.311899],
    visitors: 129.1,
    revenue: 14.7,
    growth: 5.1,
    spots: [
      { name: '临沂蒙山', value: 10.5 },
      { name: '沂水地下大峡谷', value: 7.3 },
      { name: '王羲之故居', value: 4.8 },
      { name: '竹泉村', value: 4.2 }
    ],
    words: ['蒙山', '沂蒙', '大峡谷', '书圣', '煎饼']
  }
  ,
  {
    name: '德州市',
    point: [116.653941, 37.251267],
    visitors: 68.7,
    revenue: 7.9,
    growth: 1.4,
    spots: [
      { name: '德州董子园', value: 5.7 },
      { name: '泉城欧乐堡', value: 8.9 },
      { name: '夏津黄河故道', value: 3.4 },
      { name: '海岛金山寺', value: 2.8 }
    ],
    words: ['扒鸡', '董子', '太阳能', '黑陶', '运河']
  },
  {
    name: '聊城市',
    point: [115.887682, 36.460117],
    visitors: 74.3,
    revenue: 8.8,
    growth: 2.9,
    spots: [
      { name: '聊城东昌湖', value: 7.9 },
      { name: '光岳楼', value: 5.1 },
      { name: '山陕会馆', value: 3.3 },
      { name: '景阳冈', value: 4.6 }
    ],
    words: ['江北水城', '东昌湖', '光岳楼', '阿胶', '运河']
  },
  {
    name: '滨州市',
    point: [117.847293, 37.542609],
    visitors: 48.6,
    revenue: 5.2,
    growth: -12.6,
    spots: [
      { name: '滨州中海公园', value: 4.2 },
      { name: '魏氏庄园', value: 2.9 },
      { name: '鹤伴山', value: 3.5 },
      { name: '孙子兵法城', value: 3.8 }
    ],
    words: ['兵法城', '贝壳堤', '冬枣', '黄河楼', '湿地']
  },
  {
    name: '菏泽市',
    point: [115.698213, 35.152257],
    visitors: 61.8,
    revenue: 6.9,
    growth: 8.7,
    spots: [
      { name: '菏泽曹州牡丹园', value: 8.6 },
      { name: '水浒好汉城', value: 4.7 },
      { name: '孙膑旅游城', value: 2.8 },
      { name: '浮龙湖', value: 2.1 }
    ],
    words: ['牡丹', '水浒', '戏曲', '羊肉汤', '国花']
  }
]

// 可复现的伪随机数（按城市索引播种，保证每次刷新数据稳定）
function seededRandom(seed: number) {
  let s = seed % 2147483647
  if (s <= 0) s += 2147483646
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

const MONTH_WEIGHTS = [0.07, 0.05, 0.06, 0.07, 0.09, 0.08, 0.12, 0.13, 0.09, 0.1, 0.08, 0.06]
const AGE_BASE_RATIO = [0.12, 0.38, 0.28, 0.15, 0.07]
const INDUSTRY_KEYS = ['旅游', '住宿', '餐饮', '购物', '娱乐', '交通', '其他'] as const
const INDUSTRY_BASE = [0.34, 0.14, 0.13, 0.17, 0.08, 0.09, 0.05]

function buildCity(raw: RawCity, index: number): CityData {
  const rand = seededRandom(index * 7919 + 13)
  const monthly2022 = MONTH_WEIGHTS.map((w) => +(raw.visitors * w * (0.9 + rand() * 0.2)).toFixed(1))
  const year2021 = raw.visitors / (1 + raw.growth / 100)
  const monthly2021 = MONTH_WEIGHTS.map((w, m) =>
    +(year2021 * w * (0.9 + rand() * 0.2) * (m < 2 ? 0.85 : 1)).toFixed(1)
  )
  let ageRest = raw.visitors
  const ageDist = AGE_BASE_RATIO.map((ratio, i) => {
    if (i === AGE_BASE_RATIO.length - 1) return +ageRest.toFixed(1)
    const v = +(raw.visitors * ratio * (0.85 + rand() * 0.3)).toFixed(1)
    ageRest = +(ageRest - v).toFixed(1)
    return v
  })
  const industry: CityData['industry'] = {} as CityData['industry']
  let revenueRest = raw.revenue
  INDUSTRY_KEYS.forEach((key, i) => {
    if (i === INDUSTRY_KEYS.length - 1) {
      industry[key] = +revenueRest.toFixed(2)
    } else {
      const v = +(raw.revenue * INDUSTRY_BASE[i] * (0.85 + rand() * 0.3)).toFixed(2)
      revenueRest = +(revenueRest - v).toFixed(2)
      industry[key] = v
    }
  })
  const spots: ScenicSpot[] = raw.spots
    .slice()
    .sort((a, b) => b.value - a.value)
    .map((s) => ({ name: s.name, value: s.value }))
  return {
    name: raw.name,
    point: raw.point,
    visitors: raw.visitors,
    revenue: raw.revenue,
    growth: raw.growth,
    monthly2021,
    monthly2022,
    ageDist,
    industry,
    spots,
    hotWords: raw.words
  }
}

export const cityDataMap: Record<string, CityData> = {}
rawCityList.forEach((raw, i) => {
  cityDataMap[raw.name] = buildCity(raw, i)
})

export const cityList: CityData[] = CITY_ORDER.map((name) => cityDataMap[name])

// 全省汇总
export interface ProvinceData {
  visitors: number
  revenue: number
  outbound: number
  growth: number
  monthly2021: number[]
  monthly2022: number[]
  ageDist: number[]
  industry: CityData['industry']
  topSpots: ScenicSpot[]
  topCities: CityData[]
  hotWords: HotWord[]
}

const GLOBAL_WORDS = ['海边', '人多', '孔子', '老师儿', '热情', '豪爽', '大葱', '美食', '泰山']

export function buildProvinceData(): ProvinceData {
  const visitors = +cityList.reduce((sum, c) => sum + c.visitors, 0).toFixed(1)
  const revenue = +cityList.reduce((sum, c) => sum + c.revenue, 0).toFixed(1)
  const outbound = +(revenue * 0.072).toFixed(1)
  const growth = +(
    cityList.reduce((sum, c) => sum + c.growth * c.visitors, 0) / visitors
  ).toFixed(1)
  const monthly2021 = Array.from({ length: 12 }, (_, m) =>
    +cityList.reduce((sum, c) => sum + c.monthly2021[m], 0).toFixed(1)
  )
  const monthly2022 = Array.from({ length: 12 }, (_, m) =>
    +cityList.reduce((sum, c) => sum + c.monthly2022[m], 0).toFixed(1)
  )
  const ageDist = Array.from({ length: 5 }, (_, i) =>
    +cityList.reduce((sum, c) => sum + c.ageDist[i], 0).toFixed(1)
  )
  const industry = {} as CityData['industry']
  INDUSTRY_KEYS.forEach((key) => {
    industry[key] = +cityList.reduce((sum, c) => sum + c.industry[key], 0).toFixed(1)
  })
  const topSpots = cityList
    .flatMap((c) => c.spots)
    .sort((a, b) => b.value - a.value)
  const topCities = cityList.slice().sort((a, b) => b.visitors - a.visitors)
  const hotWords: HotWord[] = GLOBAL_WORDS.map((name, i) => ({
    name,
    value: [19, 4, 8, 2, 6, 7, 5, 4, 16][i]
  }))
  return {
    visitors,
    revenue,
    outbound,
    growth,
    monthly2021,
    monthly2022,
    ageDist,
    industry,
    topSpots,
    topCities,
    hotWords
  }
}

export const provinceData = buildProvinceData()

// 城市热词（带位置与权重，位置固定以保证不错位）
const WORD_LAYOUT: [number, number][] = [
  [50, 50],
  [12, 28],
  [85, 78],
  [26, 58],
  [68, 18]
]

export function getCityHotWords(name: string): HotWord[] {
  const city = cityDataMap[name]
  if (!city) return provinceData.hotWords
  return city.hotWords.slice(0, 5).map((word, i) => ({
    name: word,
    value: Math.max(4, Math.round(22 - i * 4 + (i % 2 === 0 ? 2 : 0)))
  }))
}

export const wordLayout = WORD_LAYOUT
