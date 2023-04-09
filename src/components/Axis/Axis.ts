import { axisBottom, axisLeft } from 'd3-axis'
import { truncateString } from '../../utilities'
import { AxisSelection, Padding } from '../../types'
import Tooltip from '../Tooltip'
import { ScaleBand, ScaleLinear } from 'd3-scale'

export type AxisConfig = Pick<
  Axis,
  | 'd3Container'
  | 'truncateSize'
  | 'axisLabels'
  | 'scaleX'
  | 'scaleY'
  | 'tooltip'
  | 'width'
  | 'height'
  | 'padding'
>

export default class Axis {
  d3Container?: AxisSelection
  truncateSize: number = 15
  axisLabels?: [string, string]
  scaleX?: ScaleBand<string>
  scaleY?: ScaleLinear<number, number, never>
  tooltip?: Tooltip
  width: number = 0
  height: number = 0
  padding: Padding = { l: 5, r: 5, t: 5, b: 5 }

  constructor(axisParams: AxisConfig) {
    if (axisParams.d3Container) {
      Object.assign(this, axisParams)
    } else {
      throw new Error('Incorrect parameters provided to Axis constructor.')
    }
  }

  render() {
    this.renderAxisX()
    this.renderAxisY()
    this.renderLabels()
    return this
  }

  renderAxisX() {
    if (!this.scaleX || !this.d3Container) return
    this.d3Container.selectAll('g.x-axis').remove()
    this.d3Container
      .append('g')
      .attr('class', 'x-axis')
      .call(axisBottom(this.scaleX))
      .attr('transform', `translate(${this.padding.l},${this.height})`)
      .selectAll('text')
      .attr('x', -5)
      .attr('y', 6)
      .attr('transform', 'rotate(310)')
      .attr('class', 'x-labels')
      .text((d: any) => truncateString(d, this.truncateSize))
      .style('text-anchor', 'end')
      .on('mousemove', (event: MouseEvent, d: any) => {
        if (this.tooltip && d.length > this.truncateSize) {
          this.tooltip.ping(`<strong>${d}</strong>`, event)
        }
      })
  }

  renderAxisY() {
    if (!this.scaleY || !this.d3Container) return
    this.d3Container.selectAll('g.y-axis').remove()
    this.d3Container
      .append('g')
      .attr('class', 'y-axis')
      .call(axisLeft(this.scaleY))
      .attr('transform', `translate(${this.padding.l},0)`)
      .selectAll('.y-axis .tick line')
      .attr('x2', () => this.width)
  }

  renderLabels() {
    if (!this.axisLabels || !this.d3Container) return
    this.d3Container.selectAll('text.labels').remove()
    this.d3Container
      .append('text')
      .attr('class', 'labels')
      .attr('x', this.height / -2 - this.padding.t / 2)
      .attr('y', 12)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text(this.axisLabels[0])
    this.d3Container
      .append('text')
      .attr('class', 'labels')
      .attr('x', (this.width + this.padding.l + this.padding.r) / 2)
      .attr('y', this.height + (this.padding.b - 5))
      .attr('text-anchor', 'middle')
      .text(this.axisLabels[1])
  }
}
