import LineChart from './'

describe('LineChart', () => {
  let oLineChart: any

  beforeEach(() => {
    const dDiv = document.createElement('div')
    oLineChart = new LineChart({
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
      bTransform: true,
    })
  })

  it('should render the chart', () => {
    oLineChart.renderChart()
    expect(oLineChart.aLines.length).toBe(2)
    expect(oLineChart.d3ChartGroup.selectAll('path.line').size()).toEqual(
      oLineChart.jConfig.aValues.length
    )
  })
})
