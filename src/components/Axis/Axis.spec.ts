import { select } from 'd3-selection'
import { scaleBand, scaleLinear } from 'd3-scale'
import Axis from './'
import { vi } from 'vitest'

describe('Axis', () => {
  let oAxis: any

  beforeEach(() => {
    const dDiv = document.createElement('div')
    oAxis = new Axis({
      d3Container: select(dDiv),
      oScaleX: scaleBand().padding(0.2),
      oScaleY: scaleLinear(),
      jPadding: { l: 5, r: 5, t: 5, b: 5 },
      aAxisLabels: ['l1', 'l2'],
    })
  })

  it('should call all render methods and return the object', () => {
    vi.spyOn(oAxis, 'renderAxisX')
    vi.spyOn(oAxis, 'renderAxisY')
    vi.spyOn(oAxis, 'renderLabels')
    const oThis = oAxis.render()
    expect(oAxis.renderAxisX).toHaveBeenCalled()
    expect(oAxis.renderAxisY).toHaveBeenCalled()
    expect(oAxis.renderLabels).toHaveBeenCalled()
    expect(oThis).toEqual(oAxis)
  })

  it('should render the x axis', () => {
    oAxis.renderAxisX()
    expect(oAxis.d3Container.selectAll('g.x-axis').size()).toBe(1)
  })

  it('should render the y axis', () => {
    oAxis.renderAxisY()
    expect(oAxis.d3Container.selectAll('g.y-axis').size()).toBe(1)
  })

  it('should render the labels', () => {
    oAxis.renderLabels()
    const oLabels = oAxis.d3Container.selectAll('text.labels')
    expect(oLabels.size()).toBe(2)
    oLabels.each((d: any, i: number, elems: any) => {
      d
      expect(elems[i].innerHTML).toBe(oAxis.aAxisLabels[i])
    })
  })
})
