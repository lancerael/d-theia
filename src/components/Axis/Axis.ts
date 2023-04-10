import { axisBottom, axisLeft } from 'd3-axis'
import { truncateString } from '../../utilities'
import { AxisSelection, Padding } from '../../types'
import Tooltip from '../Tooltip'
import { ScaleBand, ScaleLinear, ScalePoint } from 'd3-scale'

export type AxisParams = Pick<
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

/**
 * A class used to create labels and an X/Y axis for the chart
 *
 * @public
 */
export default class Axis {
  /**
   * d3 object for axis container
   */
  d3Container!: AxisSelection

  /**
   * Amount to truncate axis labels to
   */
  truncateSize?: number = 15

  /**
   * Duo of axis labels
   */
  axisLabels!: [string, string]

  /**
   * Scale object for the x axis
   */
  scaleX?: ScaleBand<string> | ScalePoint<string>

  /**
   * Scale object for the y axis
   */
  scaleY?: ScaleLinear<number, number, never>

  /**
   * Chart's tooltip object
   */
  tooltip?: Tooltip

  /**
   * The current calculated width of the chart
   */
  width: number = 0

  /**
   * The current calculated height of the chart
   */
  height: number = 0

  /**
   * The padding for the chart within the container
   */
  padding: Padding = { l: 5, r: 5, t: 5, b: 5 }

  constructor(axisParams: AxisParams) {
    if (axisParams.d3Container) {
      Object.assign(this, axisParams)
    } else {
      throw new Error('Incorrect parameters provided to Axis constructor.')
    }
  }

  /**
   * Master render to call all renderers
   *
   */
  public render() {
    this.renderAxisX()
    this.renderAxisY()
    this.renderLabels()
    return this
  }

  /**
   * Render only the x axis
   *
   */
  public renderAxisX() {
    if (!this.scaleX) return
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
      .text((d: any) =>
        this.truncateSize ? truncateString(d, this.truncateSize) : d
      )
      .style('text-anchor', 'end')
      .on('mousemove', (event: MouseEvent, d: any) => {
        if (this.tooltip && d.length > Number(this?.truncateSize)) {
          this.tooltip?.ping(`<strong>${d}</strong>`, event)
        }
      })
  }

  /**
   * Render only the y axis
   *
   */
  public renderAxisY() {
    if (!this.scaleY) return
    this.d3Container.selectAll('g.y-axis').remove()
    this.d3Container
      .append('g')
      .attr('class', 'y-axis')
      .call(axisLeft(this.scaleY))
      .attr('transform', `translate(${this.padding.l},0)`)
      .selectAll('.y-axis .tick line')
      .attr('x2', () => this.width)
  }

  /**
   * Render only the labels
   *
   */
  public renderLabels() {
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
    return this
  }
}
