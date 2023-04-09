import AxisChart from './'

describe('AxisChart', () => {
  let oAxisChart: any

  beforeEach(() => {
    const dDiv = document.createElement('div')
    oAxisChart = new AxisChart({
      container: dDiv,
      chartConfig: {
        axisKeys: ['k3'],
        axisLabels: ['y', 'x'],
        itemValues: [
          {
            key: 'k1',
            name: 'K1',
            sColour: 'red',
          },
          {
            key: 'k2',
            name: 'K2',
            sColour: 'blue',
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

  it('should set up the scale objects', () => {
    oAxisChart.setDimensions()
    expect(oAxisChart.scaleX.domain()[0]).toBe('six')
    expect(oAxisChart.scaleX.domain()[1]).toBe('nine')
    expect(oAxisChart.scaleY.domain()[1]).toBe(8)
  })

  it('should render the chart group', () => {
    oAxisChart.renderChart()
    expect(oAxisChart.d3ChartGroup.size()).toBe(1)
  })
})
