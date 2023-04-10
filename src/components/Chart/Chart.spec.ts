import { getRandomData } from '../../utilities'
import Chart from './'

describe('Chart', () => {
  let chart: any

  const chartData = getRandomData()

  beforeEach(() => {
    const dDiv = document.createElement('div')
    document.body.appendChild(dDiv)
    chart = new Chart({ container: dDiv, ...chartData })
  })

  it('should use ID string to get DOM element', () => {
    const dDiv = document.createElement('div')
    dDiv.setAttribute('id', 'test')
    document.body.appendChild(dDiv)
    chart = new Chart({ containerId: 'test', ...chartData })
    expect(chart.container).toEqual(dDiv)
  })

  it('should set valid container node', () => {
    const dDiv = document.createElement('div')
    const fnUpdate = () => {
      chart.setContainer(dDiv)
    }
    expect(fnUpdate.bind(dDiv)).not.toThrow()
    expect(chart.container).toEqual(dDiv)
  })

  it('should throw error message for invalid container node', () => {
    const fnUpdate: any = () => {
      chart.setContainer({})
    }
    expect(fnUpdate.bind()).toThrow()
  })

  it('should set valid json config', () => {
    const chartConfig = { field: 'value' }
    const fnUpdate: any = () => {
      chart.setConfig(chartConfig)
    }
    expect(fnUpdate.bind()).not.toThrow()
    expect(chart.chartConfig).toEqual(chartConfig)
  })

  it('should throw error message for missing json', () => {
    const fnUpdate: any = () => {
      chart.setConfig()
    }
    expect(fnUpdate.bind()).toThrow()
  })

  it('should set valid data', () => {
    const chartData = [{ field: 'value' }]
    const fnUpdate: any = () => {
      chart.setData(chartData)
    }
    expect(fnUpdate.bind()).not.toThrow()
    expect(chart.chartData).toEqual(chartData)
  })

  it('should throw error message for missing data', () => {
    const fnUpdate: any = () => {
      chart.setData()
    }
    expect(fnUpdate.bind()).toThrow()
  })

  it('should update the dimensions correctly', () => {
    chart.setContainer(document.createElement('div'))
    const fnUpdate: any = () => {
      chart.setDimensions()
    }
    expect(fnUpdate.bind()).not.toThrow()
    expect(typeof chart.width).toBe('number')
    expect(typeof chart.height).toBe('number')
  })

  it('should initialise the chart correctly', () => {
    const dDiv = document.createElement('div')
    chart.setContainer(dDiv)
    chart.setConfig({ field: 'value' })
    chart.setData([{ field: 'value' }])
    const fnInit: any = () => {
      chart.init()
    }
    expect(fnInit.bind()).not.toThrow()
    expect(typeof chart.tooltip).toBe('object')
    expect(chart.svg.parentNode).toEqual(dDiv)
  })

  it('should throw error message for incorrectly initialised chart', () => {
    const fnInit: any = () => {
      const dDiv = document.createElement('div')
      document.body.appendChild(dDiv)
      //@ts-ignore
      chart = new Chart({ container: dDiv })
    }
    expect(fnInit.bind()).toThrow()
  })
})
