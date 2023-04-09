import Chart from './'

describe('Chart', () => {
  let oChart: any

  beforeEach(() => {
    oChart = new Chart()
  })

  it('should use ID string to get DOM element', () => {
    const dDiv = document.createElement('div')
    dDiv.setAttribute('id', 'test')
    document.body.appendChild(dDiv)
    oChart = new Chart({ containerId: 'test' })
    expect(oChart.container).toEqual(dDiv)
  })

  it('should set valid container node', () => {
    const dDiv = document.createElement('div')
    const fnUpdate = () => {
      oChart.setContainer(dDiv)
    }
    expect(fnUpdate.bind(dDiv)).not.toThrow()
    expect(oChart.container).toEqual(dDiv)
  })

  it('should throw error message for invalid container node', () => {
    const fnUpdate: any = () => {
      oChart.setContainer({})
    }
    expect(fnUpdate.bind()).toThrow()
  })

  it('should set valid json config', () => {
    const chartConfig = { field: 'value' }
    const fnUpdate: any = () => {
      oChart.setConfig(chartConfig)
    }
    expect(fnUpdate.bind()).not.toThrow()
    expect(oChart.chartConfig).toEqual(chartConfig)
  })

  it('should throw error message for missing json', () => {
    const fnUpdate: any = () => {
      oChart.setConfig()
    }
    expect(fnUpdate.bind()).toThrow()
  })

  it('should set valid data', () => {
    const chartData = [{ field: 'value' }]
    const fnUpdate: any = () => {
      oChart.setData(chartData)
    }
    expect(fnUpdate.bind()).not.toThrow()
    expect(oChart.chartData).toEqual(chartData)
  })

  it('should throw error message for missing data', () => {
    const fnUpdate: any = () => {
      oChart.setData()
    }
    expect(fnUpdate.bind()).toThrow()
  })

  it('should update the dimensions correctly', () => {
    oChart.setContainer(document.createElement('div'))
    const fnUpdate: any = () => {
      oChart.setDimensions()
    }
    expect(fnUpdate.bind()).not.toThrow()
    expect(typeof oChart.width).toBe('number')
    expect(typeof oChart.height).toBe('number')
  })

  it('should throw error message for dimensions when missing container', () => {
    const fnUpdate: any = () => {
      oChart.setDimensions()
    }
    expect(fnUpdate.bind()).toThrow()
  })

  it('should initialise the chart correctly', () => {
    const dDiv = document.createElement('div')
    oChart.setContainer(dDiv)
    oChart.setConfig({ field: 'value' })
    oChart.setData([{ field: 'value' }])
    const fnInit: any = () => {
      oChart.init()
    }
    expect(fnInit.bind()).not.toThrow()
    expect(typeof oChart.tooltip).toBe('object')
    expect(oChart.svg.parentNode).toEqual(dDiv)
  })

  it('should throw error message for incorrectly initialised chart', () => {
    const fnInit: any = () => {
      oChart.init()
    }
    expect(fnInit.bind()).toThrow()
  })
})
