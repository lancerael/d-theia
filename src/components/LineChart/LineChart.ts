import { line } from 'd3-shape'
import { select } from 'd3-selection'
import { scalePoint } from 'd3-scale'
import 'd3-transition'
import AxisChart from '../AxisChart'
import { AxisChartConfig, ChartParams } from '../../types'
import { easeLinear } from 'd3-ease'

/**
 * A line chart containing X/Y axes, key and tooltip.
 *
 * @public
 */
export default class LineChart extends AxisChart {
  /**
   * The previous count of types for cleanup
   */
  private typeCount: number = 0

  constructor(chartParams = {} as ChartParams<AxisChartConfig>) {
    super(chartParams)
    this.chartType = 'line'
    this.scaleX = scalePoint()
  }

  /**
   * Render the chart including lines, axes and labels
   */
  public renderChart() {
    super.renderChart()
    const { itemValues } = this.chartConfig
    const { scaleX, scaleY } = this

    // Get the x scale value
    const getX = (d: any) =>
      Number(scaleX(d.itemLabel)) + scaleX.bandwidth() / 2

    // Check for cleanup
    if (!!this.typeCount && this.typeCount > itemValues.length) {
      this.d3ChartGroup
        .selectAll(`circle.circles`)
        .data(this.chartData)
        .exit()
        .remove()

      this.d3ChartGroup.selectAll(`path.line`).data([]).exit().remove()
    }

    this.typeCount = itemValues.length

    // Iterate through config value keys
    itemValues.forEach(({ color, name }: any, i: number) => {
      // Get the y scale value
      const getY = (d: any) => scaleY(d.itemValues[i])

      // Bind line data
      const lines: any = this.d3ChartGroup
        .selectAll(`path.lines-${i}`)
        .data([this.chartData])

      // Cleanup old lines
      lines.exit().remove()

      // Update existing lines
      lines.enter().append('path').attr('class', `line lines-${i}`)

      setTimeout(() => {
        this.d3ChartGroup
          .selectAll(`path.lines-${i}`)
          .merge(lines)
          .transition()
          .ease(easeLinear)
          .duration(this.transitionTime)
          .attr('stroke', color)
          .attr('d', line().x(getX).y(getY) as any)
      })

      // Bind circle data
      const circles = this.d3ChartGroup
        .selectAll(`circle.circles-${i}`)
        .data(this.chartData)

      // Cleanup old circles
      circles.exit().remove()

      /// Add new circles
      circles
        .enter()
        .append('circle')
        .attr('class', `circles circles-${i}`)
        .attr('r', 5)
        .attr('cx', getX)
        .attr('cy', getY)
        .on('mousemove', (event: MouseEvent, d: any) => {
          this.tooltip.ping([d.itemLabel, name, d.itemValues[i]], event)
        })
        .on('mouseover', (event: MouseEvent) => {
          select(event.target as HTMLElement).attr(
            'style',
            'filter: brightness(50%)'
          )
        })
        .on('mousedown', (event: MouseEvent, d: any) => {
          this.chartConfig.clickCallback?.(event, d)
        })
        .on('mouseout', (event: MouseEvent) => {
          this.tooltip.hide()
          select(event.target as HTMLElement).attr(
            'style',
            'filter: brightness(100%)'
          )
        })

      // Updace changed circles
      setTimeout(() => {
        this.d3ChartGroup
          .selectAll(`circle.circles-${i}`)
          .attr('fill', color)
          .transition()
          .ease(easeLinear)
          .duration(this.transitionTime / 2)
          .attr('cx', getX)
          .attr('cy', getY)
      })
    })
  }
}
