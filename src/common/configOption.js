import * as echarts from 'echarts'
const initEchart = (option = {}) => {
  let color = ['#00F6FF', '#007CFF']
  let initOption = {
    color: color,
    grid: {
      icon: 'roundRect',
      right: '7%',
      left: '15%',
      top: '30%',
      bottom: '15%'
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(10, 65, 132, 0.5)',
      borderColor: 'rgba(10, 65, 132, 0.5)',
      textStyle: {
        color: '#fff',
        fontSize: 12
      },
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      textStyle: {
        color: color
      },
      icon: 'roundRect',
      align: 'auto',
      right: '7%',
      top: '15%',
      itemWidth: 14,
      selectedMode: false
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      axisPointer: {
        type: 'shadow'
      },
      nameTextStyle: {
        color: '#333'
      },
      axisLabel: {
        formatter: '{value}'
      },
      axisLabel: {
        color: '#333',
        fontSize: 10,
        rotate: 20
      }
    },
    yAxis: [
      {
        type: 'value',
        name: '%',
        axisLabel: {
          formatter: '{value}'
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: 'rgba(163, 163, 163, 0.2)'
          }
        }
      }
    ]
  }
  let obj = {}
  Object.keys(initOption).map(key => {
    obj[key] = Object.assign({}, initOption[key], option[key])
  })
  console.log('obj', obj)
  return obj
}
export const doubleBarOption = {
  addOption(config) {
    const option = {
      color: config.color,
      grid: {
        icon: 'roundRect',
        right: '7%',
        left: '15%',
        top: '30%',
        bottom: '15%',
        itemWidth: 14
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(10, 65, 132, 0.5)',
        borderColor: 'rgba(10, 65, 132, 0.5)',
        textStyle: {
          color: '#fff',
          fontSize: 12
        },
        axisPointer: {
          type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
        },
        formatter: params => {
          const { axisValue } = params[0]
          let content = `<div>${axisValue}</div> `
          for (var i = 0; i < params.length; i++) {
            const { seriesName, value, marker } = params[i]
            content += `
              <div>${marker} ${seriesName} ${value} 个</div>
            `
          }
          return content
        }
      },
      legend: {
        data: config.title,
        textStyle: {
          color: config.color
        },
        icon: 'roundRect',
        align: 'auto',
        right: '7%',
        top: '15%',
        itemWidth: 14,
        selectedMode: false
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: [
          '1工单',
          '2工单',
          '3工单',
          '4工单',
          '5工单',
          '6工单',
          '7工单',
          '8工单',
          '9工单',
          '10工单',
          '11工单',
          '12工单'
        ],
        axisPointer: {
          type: 'shadow'
        },
        nameTextStyle: {
          color: '#fff'
        },
        axisLabel: {
          formatter: '{value}'
        },
        axisLabel: {
          color: 'white',
          fontSize: 10,
          rotate: 20
        }
      },
      yAxis: [
        {
          type: 'value',
          name: '(个)',
          axisLabel: {
            formatter: '{value}'
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: 'rgba(163, 163, 163, 0.2)'
            }
          }
        }
      ],
      series: [
        {
          name: config.title[0] || '11',
          type: 'bar',
          barWidth: 12,
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 1,
                color: '#0FFFF2'
              },
              {
                offset: 0,
                color: 'rgba(33, 231, 251, 0.2)'
              }
            ])
          }
        },
        {
          name: config.title[1] || '21',
          type: 'bar',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          barWidth: 12,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 1,
                color: '#138DFF'
              },
              {
                offset: 0,
                color: 'rgba(0, 102, 198, 0.2)'
              }
            ])
          }
        }
      ]
    }
    return option
  }
}
export const levelBarOption = {
  addOption(config) {
    const option = {
      color: config.color,
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(10, 65, 132, 0.5)',
        borderColor: 'rgba(10, 65, 132, 0.5)',
        textStyle: {
          color: '#fff',
          fontSize: 12
        },
        axisPointer: {
          type: 'line', // 'shadow' as default; can also be 'line' or 'shadow'
          lineStyle: {
            color: 'rgba(163, 163, 163, 0.2)'
          }
        },
        valueFormatter: value => value
      },
      legend: {
        textStyle: {
          color: config.color
        },
        icon: 'roundRect',
        align: 'auto',
        right: '0%',
        top: '15%',
        itemWidth: 14,
        selectedMode: false
      },
      grid: {
        left: '5%',
        right: '5%',
        top: '25%',
        bottom: '0',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: 'rgba(163, 163, 163, 0.2)'
          }
        }
      },
      yAxis: {
        type: 'category',
        data: ['车型1', '车型2', '车型3', '车型4', '车型5', '车型6', '车型7']
      },
      series: [
        {
          name: 'C',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          barWidth: 20,
          label: {
            show: true,
            offset: [0, -10], // 将标签上移20个像素
            fontWeight: 500,
            align: 'center',
            fontSize: 14,
            color: '#333',
            formatter: function (params) {
              return params.data
            }
          },
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#47D1FF'
                },
                {
                  offset: 1,
                  color: '#0088FF'
                }
              ]
            }
          },
          data: [10, 20, 30, 40, 50, 60, 70]
        },
        {
          name: 'D',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          label: {
            show: true,
            offset: [0, -10], // 将标签上移20个像素
            fontWeight: 500,
            align: 'center',
            color: '#333',
            fontSize: 14,
            formatter: function (params) {
              return params.data
            }
          },
          barMaxWidth: 12,
          data: [70, 60, 50, 40, 30, 20, 10],
          itemStyle: {
            borderRadius: [0, 10, 10, 0], // 设置四个圆角的半径，顺序为左上、右上、右下、左下
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#71FFD8'
                },
                {
                  offset: 1,
                  color: '#4FCEC5'
                }
              ]
            }
          }
        }
      ]
    }
    return option
  }
}

export const doubleLineOption = {
  addOption(config) {
    const option = {
      color: config.color,
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(10, 65, 132, 0.5)',
        borderColor: 'rgba(10, 65, 132, 0.5)',
        textStyle: {
          color: '#fff',
          fontSize: 12
        },
        axisPointer: {
          type: 'line', // 'shadow' as default; can also be 'line' or 'shadow'
          lineStyle: {
            color: 'rgba(163, 163, 163, 0.2)'
          }
        },
        valueFormatter: value => value + '%'
      },
      legend: {
        data: config.title,
        textStyle: {
          color: config.color
        },
        icon: 'roundRect',
        align: 'auto',
        right: '5%',
        top: '15%',
        itemWidth: 14,
        selectedMode: false
      },
      grid: {
        left: '7%',
        right: '7%',
        top: '30%',
        bottom: 0,
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        splitLine: {
          show: false //网格
        },
        data: ['车型1', '车型2', '车型3', '车型4', '车型5', '车型6', '车型7'],
        axisLabel: {
          formatter: str => {
            let val = str.substring(0, 12)
            let result = ''
            const textLength = val.length
            const limitNumber = 6 // 一行显示几个字
            if (textLength > limitNumber) {
              for (var i = 0; i < textLength; i += limitNumber) {
                result += val.substring(i, i + limitNumber) + '\n'
              }
              result = result.trim() // 移除最后一个换行符
              result = result + '...'
            } else {
              result = val
            }
            return result
          }
        }
      },
      yAxis: {
        name: '[百分比%]',
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: 'rgba(163, 163, 163, 0.2)'
          }
        }
      },
      series: [
        {
          name: config.title[0],
          type: 'line',
          stack: 'Total',
          areaStyle: {
            //区域填充样式
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(0,246,255,1)'
                },
                {
                  offset: 1,
                  color: 'rgba(0,246,255,0)'
                }
              ],
              false
            ),
            shadowColor: 'rgba(22,99,195, 0.5)', //阴影颜色
            shadowBlur: 10 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          },
          data: [0, 0, 0, 0, 0, 0, 0]
        },
        {
          name: config.title[1],
          type: 'line',
          stack: 'Total',
          areaStyle: {
            //区域填充样式
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: 'rgba(0,124,255,1)'
                },
                {
                  offset: 1,
                  color: 'rgba(0,124,255,0)'
                }
              ],
              false
            ),
            shadowColor: 'rgba(31,160,241,1)', //阴影颜色
            shadowBlur: 10 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          },
          data: [0, 0, 0, 0, 0, 0, 0]
        }
      ]
    }
    return option
  }
}

export const rankingBarOption = {
  addOption(config) {
    let colorList = config.color
    let result = [
      { name: '部件1', value: 50 },
      { name: '部件2', value: 40 },
      { name: '部件3', value: 30 },
      { name: '部件4', value: 20 },
      { name: '部件5', value: 10 }
    ]
    var option = {
      color: colorList,
      tooltip: {
        show: false,
        trigger: 'item',
        padding: [8, 15],
        backgroundColor: 'rgba(12, 51, 115,0.8)',
        borderColor: 'rgba(3, 11, 44, 0.5)',
        textStyle: {
          color: '#9bb2de'
        }
      },
      legend: {
        show: false
      },
      grid: {
        left: '20%',
        right: '20%',
        top: '10%',
        bottom: '10%'
      },
      xAxis: [
        {
          splitLine: {
            show: false
          },
          type: 'value',
          show: false
        }
      ],
      yAxis: [
        {
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          type: 'category',
          axisTick: {
            show: false
          },
          inverse: true,
          data: result.map(item => item.name),
          axisLabel: {
            formatter: (name, index) => {
              const id = index + 1
              if (id < 4) {
                return `{rank${id}|${id}} {th${id}|${'th'}}`
              } else {
                return `{rank|${id}} {th|${'th'}}`
              }
            },
            rich: {
              rank1: {
                fontSize: 24,
                fontFamily: 'YouSheBiaoTiHei',
                align: 'center',
                color: colorList[0]
              },
              rank2: {
                fontSize: 24,
                fontFamily: 'YouSheBiaoTiHei',
                align: 'center',
                color: colorList[1]
              },
              rank3: {
                fontSize: 24,
                fontFamily: 'YouSheBiaoTiHei',
                align: 'center',
                color: colorList[2]
              },
              rank: {
                fontSize: 24,
                fontFamily: 'YouSheBiaoTiHei',
                align: 'center',
                color: colorList[3]
              },
              th1: {
                fontSize: 18,
                fontFamily: 'YouSheBiaoTiHei',
                align: 'center',
                color: colorList[0],
                verticalAlign: 'bottom'
              },
              th2: {
                fontSize: 18,
                fontFamily: 'YouSheBiaoTiHei',
                align: 'center',
                color: colorList[1],
                verticalAlign: 'bottom'
              },
              th3: {
                fontSize: 18,
                fontFamily: 'YouSheBiaoTiHei',
                align: 'center',
                color: colorList[2],
                verticalAlign: 'bottom'
              },
              th: {
                fontSize: 18,
                fontFamily: 'YouSheBiaoTiHei',
                align: 'center',
                color: colorList[3],
                verticalAlign: 'bottom'
              }
            }
          }
        }
      ],
      series: [
        {
          name: '',
          type: 'bar',
          barWidth: 14, // 柱子宽度
          MaxSize: 0,
          showBackground: false,
          borderRadius: [30, 30, 30, 30],
          backgroundStyle: {
            color: '#194B72'
          },
          // 名称
          label: {
            show: true,
            offset: [10, -20], // 将标签上移20个像素
            color: '#333',
            fontWeight: 400,
            position: 'left',
            align: 'left',
            fontSize: 16,
            fontFamily: 'YouSheBiaoTiHei',
            formatter: function (params) {
              return params.data.name
            }
          },
          data: result.map((item, index) => {
            return {
              name: item.name,
              value: item.value,
              itemStyle: {
                borderRadius: [30, 30, 30, 30],
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#0F1F45'
                    },
                    {
                      offset: 1,
                      color: colorList[index]
                    }
                  ]
                }
              }
            }
          })
        },
        {
          name: '',
          type: 'bar',
          barGap: '-100%',
          barWidth: 14, // 柱子宽度
          MaxSize: 0,
          showBackground: false,
          borderRadius: [30, 30, 30, 30],
          backgroundStyle: {
            color: '#194B72'
          },
          // 名称
          label: {
            position: 'right',
            distance: 4,
            show: true,
            offset: [0, -20], // 将标签上移20个像素
            formatter: function (params) {
              return '{a|' + params.data.value + '}' + '{b|个}'
            },
            rich: {
              align: 'left',
              a: {
                color: '#00D1FF',
                fontSize: 20,
                fontFamily: 'UnidreamLED',
                fontWeight: 500
              },
              b: {
                color: '#00D1FF',
                fontSize: 12,
                verticalAlign: 'bottom'
              }
            }
          },
          data: result.map((item, index) => {
            return {
              name: item.name,
              value: item.value,
              itemStyle: {
                borderRadius: [30, 30, 30, 30],
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#0F1F45'
                    },
                    {
                      offset: 1,
                      color: colorList[index]
                    }
                  ]
                }
              }
            }
          })
        }
      ]
    }
    return option
  }
}

export const rateBarOption = {
  addOption(config) {
    let colorList = config.color || ['#FF4B01', '#FF7B00', '#FFE823']
    // let colorMap = {
    //   '自检': config.color[0][0],
    //   '线检': config.color[1][0],
    //   '完检':config.color[2][0]
    // }
    let result = [
      {
        name: '自检',
        value: 10,
        symbol: 'image://' + new URL(`../../public/img/zj.png`, import.meta.url).href
      },
      {
        name: '线检',
        value: 20,
        symbol: 'image://' + new URL(`../../public/img/xj.png`, import.meta.url).href
      },
      { name: '完检', value: 30, symbol: 'image://' + new URL(`../../public/img/wj.png`, import.meta.url).href }
    ]
    let option = {
      // color: colorList,
      // tooltip: {
      //   trigger: 'axis',
      //   axisPointer: {
      //     type: 'shadow'
      //   }
      // },
      grid: {
        left: 0,
        right: '10%',
        top: '10%',
        bottom: 0,
        containLabel: true
      },
      xAxis: [
        {
          type: 'value',
          show: false,
          boundaryGap: 0,
          min: 0,
          max: 100
        }
      ],
      yAxis: {
        show: false,
        data: result.map(item => item.name)
      },
      series: [
        {
          name: '站点合格率',
          type: 'bar',
          barWidth: 12, // 柱子宽度
          MaxSize: 0,
          showBackground: true, // 展示轨道
          label: {
            show: true,
            offset: [10, -20], // 将标签上移20个像素
            position: 'left',
            align: 'left',
            formatter: function (params) {
              return `{a${params.dataIndex}|${params.data.name}}`
            },
            rich: {
              align: 'left',
              a0: {
                color: colorList[0][0],
                fontWeight: 400,
                fontSize: 16,
                fontFamily: 'YouSheBiaoTiHei'
              },
              a1: {
                color: colorList[1][0],
                fontWeight: 400,
                fontSize: 16,
                fontFamily: 'YouSheBiaoTiHei'
              },
              a2: {
                color: colorList[2][0],
                fontWeight: 400,
                fontSize: 16,
                fontFamily: 'YouSheBiaoTiHei'
              }
            }
          },
          data: result.map((item, index) => {
            return {
              name: item.name,
              value: item.value,
              itemStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 1,
                      color: colorList[index][0]
                    },
                    {
                      offset: 0,
                      color: colorList[index][1]
                    }
                  ]
                }
              }
            }
          })
        },
        {
          name: '',
          type: 'scatter',
          emphasis: {
            scale: false
          },
          symbol: 'emptyCircle',
          symbolSize: [24, 24], // 进度条白点
          tooltip: {
            show: false
          },
          itemStyle: {
            color: function (params) {
              return colorList[params.dataIndex < 3 ? params.dataIndex : 3][0]
            },
            shadowColor: '#7070703D',
            shadowBlur: 5,
            borderWidth: 1,
            opacity: 1
          },
          // 名称
          label: {
            position: 'right',
            distance: 4,
            show: true,
            offset: [0, -20], // 将标签上移20个像素
            formatter: function (params) {
              return '{a|' + params.data.value + '%}'
            },
            rich: {
              align: 'left',
              a: {
                color: '#ffffff',
                fontSize: 20,
                fontFamily: 'UnidreamLED',
                fontWeight: 500
              }
            }
          },
          z: 2,
          data: result,
          animationDelay: 500
        }
      ]
    }
    return option
  }
}
