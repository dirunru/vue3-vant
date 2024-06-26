export default function () {
  // 环图
  const pieOption = (data, color) => {
    let option = {
      color: color,
      legend: {
        orient: 'vertical',
        right: '10%',
        top: 'middle',
        icon: 'circle'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['60%', '75%'],
          top: '0%',
          right: '60%',
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 1
          },
          label: {
            show: false
          },
          data: data
        }
      ]
    }
    return option
  }
  // 嵌套环图
  const circleOption = (data, color) => {
    // 处理颜色
    let color_1 = [...color]
    let color_2 = [...color]
    color_2.unshift(color_2.pop())
    // 处理数据
    let data_1 = []
    let data_2 = []
    data_1 = data.map((item, index) => {
      return {
        itemStyle: {
          color: color_1[index]
        },
        ...item
      }
    })
    data_2 = data.map((item, index) => {
      return {
        itemStyle: {
          color: color_2[index],
          borderColor: color_2[index]
        },
        ...item
      }
    })
    let option = {
      legend: {
        orient: 'vertical',
        right: '10%',
        icon: 'circle',
        top: 'middle'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['60%', '75%'],
          top: '0%',
          right: '60%',
          avoidLabelOverlap: false, // 防止标签重叠
          hoverAnimation: false,
          itemStyle: {
            borderWidth: 0,
            borderColor: '#fff'
            //   borderRadius: [0, '50%', 0, '50%']
          },
          label: {
            show: false,
            position: 'center' // 标签位置
          },
          emphasis: {
            label: {
              show: false,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: data_1,
          z: 0
        },
        {
          name: 'Access From',
          type: 'pie',
          radius: ['60%', '75%'],
          top: '0%',
          right: '60%',
          avoidLabelOverlap: false,
          hoverAnimation: false,
          itemStyle: {
            borderRadius: [0, '50%', 0, '50%']
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: false,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: data_2
        }
      ]
    }
    return option
  }

  return {
    pieOption,
    circleOption
  }
}
