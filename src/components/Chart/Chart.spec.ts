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
    oChart = new Chart({ sContainer: 'test' })
    expect(oChart.dContainer).toEqual(dDiv)
  })

  it('should set valid container node', () => {
    const dDiv = document.createElement('div')
    const fnUpdate = () => {
      oChart.setContainer(dDiv)
    }
    expect(fnUpdate.bind(dDiv)).not.toThrow()
    expect(oChart.dContainer).toEqual(dDiv)
  })

  it('should throw error message for invalid container node', () => {
    const fnUpdate: any = () => {
      oChart.setContainer({})
    }
    expect(fnUpdate.bind()).toThrow()
  })

  it('should set valid json config', () => {
    const jConfig = { field: 'value' }
    const fnUpdate: any = () => {
      oChart.setConfig(jConfig)
    }
    expect(fnUpdate.bind()).not.toThrow()
    expect(oChart.jConfig).toEqual(jConfig)
  })

  it('should throw error message for missing json', () => {
    const fnUpdate: any = () => {
      oChart.setConfig()
    }
    expect(fnUpdate.bind()).toThrow()
  })

  it('should set valid data', () => {
    const aData = [{ field: 'value' }]
    const fnUpdate: any = () => {
      oChart.setData(aData)
    }
    expect(fnUpdate.bind()).not.toThrow()
    expect(oChart.aData).toEqual(aData)
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
    expect(typeof oChart.iWidth).toBe('number')
    expect(typeof oChart.iHeight).toBe('number')
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
    expect(typeof oChart.oTooltip).toBe('object')
    expect(oChart.dSvg.parentNode).toEqual(dDiv)
  })

  it('should throw error message for incorrectly initialised chart', () => {
    const fnInit: any = () => {
      oChart.init()
    }
    expect(fnInit.bind()).toThrow()
  })
})
