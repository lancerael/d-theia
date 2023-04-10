import { line } from 'd3-shape'
import { select } from 'd3-selection'
import { scalePoint } from 'd3-scale'
import { rgb } from 'd3-color'
import 'd3-transition'
import AxisChart from '../AxisChart'
import { AxisChartConfig, ChartParams } from '../../types'

/**
 * A line chart containing X/Y axes, key and tooltip.
 *
 * @public
 */
export default class LineChart extends AxisChart {
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
    if (
      [...this.d3ChartGroup.selectAll(`circle.circles`)].length /
        itemValues.length >
      this.chartData.length
    ) {
      this.d3ChartGroup
        .selectAll(`circle.circles`)
        .data(this.chartData)
        .exit()
        .remove()
    }

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
      lines
        .enter()
        .append('path')
        .attr('class', `line lines-${i}`)
        .merge(lines)
        .transition()
        .attr('stroke', color)
        .attr('d', line().x(getX).y(getY))

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
        .on('mousemove', (event: MouseEvent, d: any) => {
          this.tooltip.ping([d.itemLabel, name, d.itemValues[i]], event)
        })
        .on('mouseover', (event: MouseEvent) => {
          select(event.target as HTMLElement).attr(
            'fill',
            rgb(color).darker().formatHex()
          )
        })
        .on('mousedown', (event: MouseEvent, d: any) => {
          this.chartConfig.clickCallback?.(event, d)
        })
        .on('mouseout', (event: MouseEvent) => {
          this.tooltip.hide()
          select(event.target as HTMLElement).attr('fill', color)
        })

      // Updace changed circles
      this.d3ChartGroup
        .selectAll(`circle.circles-${i}`)
        .attr('fill', color)
        .attr('cx', getX)
        .attr('cy', getY)
    })
  }
}
