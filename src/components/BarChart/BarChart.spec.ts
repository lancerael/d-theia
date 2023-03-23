import BarChart from './'
import { expect } from 'vitest'

describe('BarChart', () => {
  let oBarChart: any

  beforeEach(() => {
    const dDiv = document.createElement('div')
    oBarChart = new BarChart({
      dContainer: dDiv,
      jConfig: {
        aAxisKeys: ['k3'],
        aAxisLabels: ['y', 'x'],
        aValues: [
          {
            sKey: 'k1',
            sName: 'K1',
            sColour: 'red',
          },
          {
            sKey: 'k2',
            sName: 'K2',
            sColour: 'blue',
          },
        ],
      },
      aData: [
        { k1: 4, k2: 5, k3: 'six' },
        { k1: 7, k2: 8, k3: 'nine' },
      ],
    })
  })

  it('should render the chart', () => {
    oBarChart.renderChart()
    expect(oBarChart.aBars.length).toBe(2)
    expect(oBarChart.d3ChartGroup.selectAll('rect.bars').size()).toEqual(
      oBarChart.jConfig.aValues.length * oBarChart.aData.length
    )
  })
})
