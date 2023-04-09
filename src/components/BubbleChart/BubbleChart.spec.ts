import BubbleChart from './'

describe('BubbleChart', () => {
  let oBubbleChart: any

  beforeEach(() => {
    const dDiv = document.createElement('div')
    oBubbleChart = new BubbleChart({
      container: dDiv,
      chartConfig: {
        axisLabels: ['y', 'x'],
        itemValues: [
          {
            key: 'k1',
            name: 'K1',
          },
          {
            key: 'k2',
            name: 'K2',
            colors: ['blue', 'red'],
          },
        ],
      },
      chartData: [
        { k1: 4, k2: 5 },
        { k1: 7, k2: 8 },
      ],
    })
  })

  it('should set up the scale object', () => {
    oBubbleChart.setDimensions()
    expect(oBubbleChart.scaleColor.domain()[1]).toBe(8)
    expect(oBubbleChart.scaleColor.range()[1]).toBe('red')
  })

  it('should render the chart', () => {
    oBubbleChart.renderChart()
    expect(oBubbleChart.bubblesGroup.selectAll('circle.circles').size()).toBe(2)
    expect(oBubbleChart.force.nodes().length).toBe(2)
  })
})
