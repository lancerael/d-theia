import BubbleChart from './'

describe('BubbleChart', () => {
  let oBubbleChart: any

  beforeEach(() => {
    const dDiv = document.createElement('div')
    oBubbleChart = new BubbleChart({
      dContainer: dDiv,
      jConfig: {
        aAxisLabels: ['y', 'x'],
        aValues: [
          {
            sKey: 'k1',
            sName: 'K1',
          },
          {
            sKey: 'k2',
            sName: 'K2',
            aColors: ['blue', 'red'],
          },
        ],
      },
      aData: [
        { k1: 4, k2: 5 },
        { k1: 7, k2: 8 },
      ],
    })
  })

  it('should set up the scale object', () => {
    oBubbleChart.setDimensions()
    expect(oBubbleChart.oScaleColor.domain()[1]).toBe(8)
    expect(oBubbleChart.oScaleColor.range()[1]).toBe('red')
  })

  it('should render the chart', () => {
    oBubbleChart.renderChart()
    expect(oBubbleChart.d3BubblesGroup.selectAll('circle.circles').size()).toBe(
      2
    )
    expect(oBubbleChart.oForce.nodes().length).toBe(2)
  })
})
