import { easeLinear } from 'd3-ease'
import { select } from 'd3-selection'
import 'd3-transition'
import AxisChart from '../AxisChart'
import { rgb } from 'd3-color'
import { BarChartConfig, ChartParams, ConfigItemValue } from '../../types'

/**
 * A bar chart containing X/Y axes, key and tooltip.
 *
 * @public
 */
export default class BarChart extends AxisChart {
  /**
   * The chart's config object
   */
  declare chartConfig: BarChartConfig

  constructor(chartParams = {} as ChartParams) {
    super(chartParams)
    this.chartType = 'bar'
  }

  /**
   * Render the chart including axes and labels
   */
  public renderChart() {
    super.renderChart()
    const { itemValues, barType = 'side' } = this.chartConfig ?? {}
    const { innerHeight, scaleX, scaleY } = this
    const barWidth = scaleX.bandwidth() / itemValues.length

    // Loop through data to create group for each "type" in the key
    itemValues.forEach(({ color, name }: ConfigItemValue, i: number) => {
      if (!this.d3ChartGroup || !color || !this.chartData) return
      const iBarOffset = barType === 'side' ? barWidth * i : 0

      // Bind data
      const bars = this.d3ChartGroup
        .selectAll(`rect.bars-${i}`)
        .data(this.chartData)

      // Remove redundant bars
      bars.exit().remove()

      // Add new bars
      bars
        .enter()
        .append('rect')
        .attr('class', `bars bars-${i}`)
        .attr('fill', color)
        .attr('x', (d: any) => (scaleX(d.itemLabel) ?? 0) + iBarOffset)
        .attr('y', innerHeight)
        .attr('width', barWidth)
        .attr('height', 0)
        .on('mousemove', (event: MouseEvent, d: any) => {
          this.tooltip?.ping([d.itemLabel, name, d.itemValues[i]], event)
        })
        .on('mouseover', (event: MouseEvent) => {
          select(event.target as HTMLElement).attr(
            'fill',
            rgb(color).darker().formatHex()
          )
        })
        .on('mousedown', (event: MouseEvent, d: any) => {
          if (this.chartConfig?.clickCallback) {
            this.chartConfig.clickCallback(event, d)
          }
        })
        .on('mouseout', (event: MouseEvent) => {
          this.tooltip?.hide()
          select(event.target as HTMLElement).attr('fill', color)
        })

      // Updated changed bars
      this.d3ChartGroup
        .selectAll(`rect.bars-${i}`)
        .transition()
        .ease(easeLinear)
        .duration(this.transitionTime)
        .attr('x', (d: any) => (scaleX(d.itemLabel) ?? 0) + iBarOffset)
        .attr('width', barWidth)
        .attr('y', (d: any) => {
          let value = d.itemValues[i]
          value = value < 0 ? Math.abs(value) : 0
          return scaleY(d.itemValues[i] + value)
        })
        .attr('height', (d: any) => {
          const modifier = this.minValue < 0 ? Math.abs(this.minValue) : 0
          return innerHeight - scaleY(Math.abs(d.itemValues[i]) - modifier)
        })
    })
  }
}
