import * as echarts from 'echarts'
import sdData from '@/assets/data/山东省'
import mapBg from '@/assets/images/mapBg.png'
import lineTop1 from '@/assets/images/lineTop1.png'
import lineTop2 from '@/assets/images/lineTop2.png'
import lineTop3 from '@/assets/images/lineTop3.png'
import lineTop4 from '@/assets/images/lineTop4.png'
import lineTop5 from '@/assets/images/lineTop5.png'
import { cityList } from '@/assets/data/cityData'

echarts.registerMap('sd', sdData as any)
const lineTopList: string[] = [lineTop1, lineTop2, lineTop3, lineTop4, lineTop5]

const SELECT_COLOR = 'rgba(255, 210, 120, 1)'
const DIM_AREA = 'rgba(8, 16, 40, 0.82)'
const NORMAL_BAR_FROM = 'rgba(232, 204, 149, 1)'
const NORMAL_BAR_TO = 'rgba(170, 144, 91, 1)'
const DIM_BAR = 'rgba(116, 128, 160, 0.4)'

// 获取地图配置，selectedCity 为当前选中城市（null 为全省总览）
export const getMapOption = (selectedCity: string | null = null) => {
  // 渐变层颜色
  const colorList: string[] = [
    '#8b5e70',
    '#81596d',
    '#78556a',
    '#6e5068',
    '#644c65',
    '#5b4762',
    '#51435f',
    '#483e5c',
    '#3e3a59',
    '#343557',
    '#2b3154',
    '#212c51'
  ]
  // 生成渐变图层
  const geoList: any[] = []
  for (let i = 1; i <= colorList.length; i++) {
    const geoItem: any = {
      map: 'sd',
      aspectScale: 0.85,
      emphasis: {
        disabled: true
      },
      z: 12 - i,
      layoutCenter: ['50%', `${i * 0.3 + 50}%`],
      layoutSize: '100%',
      itemStyle: {
        normal: {
          areaColor: colorList[i - 1],
          borderWidth: 0
        }
      }
    }
    if (i === colorList.length) {
      geoItem.itemStyle.normal.shadowColor = 'rgba(0, 0, 0, 0.71)'
      geoItem.itemStyle.normal.shadowBlur = 100
    }
    geoList.push(geoItem)
  }

  const hasSelection = selectedCity !== null
  // 可点击的区域层：承担高亮/变暗/名称
  const regionData = cityList.map((c) => {
    const selected = c.name === selectedCity
    const dimmed = hasSelection && !selected
    return {
      name: c.name,
      selected,
      itemStyle: {
        areaColor: selected ? 'rgba(218, 163, 88, 0.55)' : dimmed ? DIM_AREA : mapBg,
        borderColor: selected ? 'rgba(255, 220, 140, 1)' : '#8aa5db',
        borderWidth: selected ? 2 : 1
      },
      label: {
        show: true,
        color: selected ? '#ffd36e' : dimmed ? 'rgba(160, 170, 196, 0.6)' : '#fff',
        fontSize: selected ? 16 : 14,
        fontWeight: selected ? 700 : 400
      },
      emphasis: {
        disabled: false,
        itemStyle: {
          areaColor: 'rgba(218, 163, 88, 0.45)',
          borderColor: 'rgba(255, 220, 140, 1)',
          borderWidth: 2
        },
        label: {
          color: '#ffd36e'
        }
      }
    }
  })

  const lineSeriesData = getLineData(selectedCity)
  const option = {
    animationDurationUpdate: 600,
    animationEasingUpdate: 'cubicInOut',
    geo: [
      // 最外围发光边界
      {
        map: 'sd',
        aspectScale: 0.85,
        layoutCenter: ['50%', '50%'],
        layoutSize: '100%',
        z: 12,
        emphasis: {
          disabled: true
        },
        itemStyle: {
          normal: {
            borderColor: 'rgb(180, 137, 81)',
            borderWidth: 8,
            shadowColor: 'rgba(218, 163, 88, 0.4)',
            shadowBlur: 20
          }
        }
      },
      // 最外层遮罩蒙版（不显示文字，文字由 series 按城市控制）
      {
        map: 'sd',
        aspectScale: 0.85,
        layoutCenter: ['50%', '50%'],
        layoutSize: '100%',
        z: 14,
        silent: true,
        emphasis: { disabled: true },
        itemStyle: {
          normal: {
            areaColor: 'rgba(106, 125, 171, 0.45)',
            borderWidth: 0
          }
        }
      },
      // 内部蓝色边界
      {
        map: 'sd',
        aspectScale: 0.85,
        layoutCenter: ['50%', '50%'],
        layoutSize: '100%',
        z: 12,
        silent: true,
        emphasis: {
          disabled: true
        },
        itemStyle: {
          normal: {
            areaColor: {
              image: mapBg
            },
            borderColor: '#8aa5db',
            borderWidth: 1
          }
        }
      },
      ...geoList
    ],
    series: [
      // 可点击区域：高亮 / 变暗 / 名称
      {
        type: 'map',
        map: 'sd',
        aspectScale: 0.85,
        layoutCenter: ['50%', '50%'],
        layoutSize: '100%',
        z: 16,
        selectedMode: false,
        animationDurationUpdate: 600,
        data: regionData
      },
      ...lineSeriesData
    ]
  }
  return option
}

// 生成 16 地市数据柱（前 5 保留顶部图标，其余使用文字标注）
const getLineData = (selectedCity: string | null) => {
  const ranked = cityList.slice().sort((a, b) => b.visitors - a.visitors)
  const top5Names = ranked.slice(0, 5).map((c) => c.name)
  const maxValue = ranked[0].visitors
  const hasSelection = selectedCity !== null

  const lineSeriesData: any[] = []

  cityList.forEach((item) => {
    const rank = top5Names.indexOf(item.name)
    const isTop5 = rank >= 0
    const selected = item.name === selectedCity
    const dimmed = hasSelection && !selected
    const barFrom = dimmed ? DIM_BAR : selected ? SELECT_COLOR : NORMAL_BAR_FROM
    const barTo = dimmed ? DIM_BAR : NORMAL_BAR_TO
    const topOffset = item.visitors / maxValue
    const opacity = dimmed ? 0.55 : 1

    // 柱体
    lineSeriesData.push({
      type: 'lines',
      zlevel: 5,
      effect: {
        show: false,
        symbolSize: 5
      },
      lineStyle: {
        width: selected ? 12 : 10,
        color: {
          type: 'linear',
          x: 1,
          y: 0,
          x2: 0,
          y2: 0,
          colorStops: [
            { offset: 0, color: barFrom },
            { offset: 1, color: selected ? 'rgba(214, 150, 60, 1)' : barTo }
          ],
          global: false
        },
        opacity: isTop5 || selected ? 1 : 0.75,
        curveness: 0,
        shadowColor: selected ? 'rgba(255, 200, 100, 0.8)' : 'transparent',
        shadowBlur: selected ? 16 : 0
      },
      label: { show: false },
      silent: false,
      animationDurationUpdate: 600,
      data: [
        {
          name: item.name,
          coords: [item.point, [item.point[0], item.point[1] + topOffset]]
        }
      ]
    })

    // 柱子顶部
    lineSeriesData.push({
      type: 'scatter',
      coordinateSystem: 'geo',
      geoIndex: 0,
      zlevel: 5,
      label: { show: false },
      symbol: 'circle',
      symbolSize: [selected ? 12 : 10, 5],
      itemStyle: {
        color: dimmed ? 'rgba(200, 205, 220, 0.7)' : 'rgba(255, 226, 158, 1)',
        opacity
      },
      silent: false,
      data: [{ name: item.name, value: [item.point[0], item.point[1] + topOffset] }]
    })

    // 柱子底部
    lineSeriesData.push({
      type: 'scatter',
      coordinateSystem: 'geo',
      geoIndex: 0,
      zlevel: 4,
      label: { show: false },
      symbol: 'circle',
      symbolSize: [10, 5],
      itemStyle: {
        color: {
          type: 'linear',
          x: 1,
          y: 0,
          x2: 0,
          y2: 0,
          colorStops: [
            { offset: 0, color: barFrom },
            { offset: 1, color: barTo }
          ],
          global: false
        },
        opacity
      },
      silent: false,
      data: [{ name: item.name, value: item.point }]
    })

    // 底部光圈
    lineSeriesData.push({
      name: 'cityRipple',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      data: [
        {
          name: item.name,
          value: [item.point[0], item.point[1], item.visitors]
        }
      ],
      showEffectOn: 'render',
      rippleEffect: {
        scale: selected ? 7 : 5,
        brushType: 'stroke'
      },
      label: { show: false },
      symbol: 'circle',
      symbolSize: [selected ? 26 : 20, 12],
      itemStyle: {
        normal: {
          color: selected ? 'rgba(255, 210, 120, 1)' : 'rgba(232, 204, 149, 1)',
          shadowBlur: selected ? 20 : 10,
          shadowColor: selected
            ? 'rgba(255, 210, 120, 1)'
            : 'rgba(232, 204, 149, 1)'
        },
        opacity: selected ? 1 : dimmed ? 0.5 : 1
      },
      zlevel: 4
    })

    // 顶部标注：前 5 用图标，其余用文字
    if (isTop5) {
      lineSeriesData.push({
        type: 'scatter',
        coordinateSystem: 'geo',
        geoIndex: 0,
        zlevel: 6,
        label: {
          normal: {
            show: true,
            formatter: (params: any) =>
              `{cityName|${params.name}}\n {value|${params.data.data}} {unit|万人}`,
            rich: {
              cityName: {
                color: selected
                  ? 'rgba(255, 220, 140, 1)'
                  : 'rgba(201, 211, 234, 1)',
                fontSize: 14,
                padding: [6, 0, 4, 48],
                fontWeight: selected ? 700 : 400
              },
              value: {
                color: 'rgba(255, 187, 94, 1)',
                fontSize: 18,
                fontWeight: 800,
                padding: [0, 0, 0, 44]
              },
              unit: {
                color: 'rgba(255, 187, 94, 1)',
                fontSize: 14
              }
            }
          }
        },
        symbol: `image://` + lineTopList[rank],
        symbolSize: [143, 48],
        symbolOffset: [0, 0],
        z: 999,
        silent: false,
        data: [
          {
            name: item.name,
            data: item.visitors,
            value: [item.point[0], item.point[1] + topOffset + 0.2]
          }
        ]
      })
    } else {
      lineSeriesData.push({
        type: 'scatter',
        coordinateSystem: 'geo',
        geoIndex: 0,
        zlevel: 6,
        label: {
          normal: {
            show: true,
            formatter: (params: any) =>
              `{cityName|${params.name}} {value|${params.data.data}}`,
            rich: {
              cityName: {
                color: dimmed ? 'rgba(160, 170, 196, 0.65)' : 'rgba(201, 211, 234, 1)',
                fontSize: 12,
                fontWeight: selected ? 700 : 400
              },
              value: {
                color: dimmed ? 'rgba(160, 170, 196, 0.65)' : 'rgba(255, 187, 94, 0.9)',
                fontSize: 12
              }
            }
          }
        },
        symbol: 'circle',
        symbolSize: [6, 3],
        itemStyle: {
          color: selected ? SELECT_COLOR : 'rgba(232, 204, 149, 0.8)',
          opacity: dimmed ? 0.5 : 1
        },
        silent: false,
        data: [
          {
            name: item.name,
            data: item.visitors,
            value: [item.point[0], item.point[1] + topOffset + 0.12]
          }
        ]
      })
    }
  })

  return lineSeriesData
}
