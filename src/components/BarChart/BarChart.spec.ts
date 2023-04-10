import BarChart from './'
import { expect } from 'vitest'

describe('BarChart', () => {
  let oBarChart: any

  beforeEach(() => {
    oBarChart = new BarChart({
      container: document.createElement('div'),
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
    oBarChart.renderChart()
    expect(oBarChart.d3ChartGroup.selectAll('rect.bars').size()).toEqual(
      oBarChart.chartConfig.itemValues.length * oBarChart.chartData.length
    )
  })
})
