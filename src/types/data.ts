// 景点热度
export interface ScenicSpot {
  name: string
  value: number // 热度（万人次）
}

// 单个城市旅游数据
export interface CityData {
  name: string
  point: [number, number] // 经纬度（柱体位置）
  visitors: number // 累计接待游客（万人次）
  revenue: number // 旅游收入（亿元）
  growth: number // 同比增速（%，负数为下降）
  monthly2021: number[] // 2021 年逐月接待（万人次）
  monthly2022: number[] // 2022 年逐月接待（万人次）
  ageDist: number[] // 五个年龄段游客分布（万人次）
  industry: {
    // 各行业收入（亿元）
    旅游: number
    住宿: number
    餐饮: number
    购物: number
    娱乐: number
    交通: number
    其他: number
  }
  spots: ScenicSpot[] // 本市热门景点
  hotWords: string[] // 本市实时热词（含权重）
}

// 热词（带权重）
export interface HotWord {
  name: string
  value: number
}
