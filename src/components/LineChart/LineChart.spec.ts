import LineChart from './'

describe('LineChart', () => {
  let oLineChart: any

  beforeEach(() => {
    const dDiv = document.createElement('div')
    oLineChart = new LineChart({
      container: dDiv,
      chartConfig: {
        axisKeys: ['k3'],
        axisLabels: ['y', 'x'],
        itemValues: [
          {
            key: 'k1',
            name: 'K1',
            color: 'red',
          },
          {
            key: 'k2',
            name: 'K2',
            color: 'blue',
          },
        ],
      },
      chartData: [
        { k1: 4, k2: 5, k3: 'six' },
        { k1: 7, k2: 8, k3: 'nine' },
      ],
      doTransform: true,
    })
  })

  it('should render the chart', () => {
    oLineChart.renderChart()
    expect(oLineChart.d3ChartGroup.selectAll('path.line').size()).toEqual(
      oLineChart.chartConfig.itemValues.length
    )
  })
})
