import { select } from 'd3-selection'
import { scaleBand, scaleLinear } from 'd3-scale'
import Axis from './'
import { vi } from 'vitest'

describe('Axis', () => {
  let axis: any

  beforeEach(() => {
    const dDiv = document.createElement('div')
    axis = new Axis({
      d3Container: select(dDiv),
      scaleX: scaleBand().padding(0.2),
      scaleY: scaleLinear(),
      padding: { l: 5, r: 5, t: 5, b: 5 },
      axisLabels: ['l1', 'l2'],
    } as any)
  })

  it('should call all render methods and return the object', () => {
    vi.spyOn(axis, 'renderAxisX')
    vi.spyOn(axis, 'renderAxisY')
    vi.spyOn(axis, 'renderLabels')
    const oThis = axis.render()
    expect(axis.renderAxisX).toHaveBeenCalled()
    expect(axis.renderAxisY).toHaveBeenCalled()
    expect(axis.renderLabels).toHaveBeenCalled()
    expect(oThis).toEqual(axis)
  })

  it('should render the x axis', () => {
    axis.renderAxisX()
    expect(axis.d3Container.selectAll('g.x-axis').size()).toBe(1)
  })

  it('should render the y axis', () => {
    axis.renderAxisY()
    expect(axis.d3Container.selectAll('g.y-axis').size()).toBe(1)
  })

  it('should render the labels', () => {
    axis.renderLabels()
    const oLabels = axis.d3Container.selectAll('text.labels')
    expect(oLabels.size()).toBe(2)
    oLabels.each((d: any, i: number, elems: any) => {
      d
      expect(elems[i].innerHTML).toBe(axis.axisLabels[i])
    })
  })
})
