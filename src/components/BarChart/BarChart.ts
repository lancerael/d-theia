import { easeLinear } from 'd3-ease'
import { BaseType, select } from 'd3-selection'
import 'd3-transition'
import AxisChart from '../AxisChart'
import { rgb } from 'd3-color'
import { ChartParams, ChartSelection, ConfigItemValue } from '../../types'
import { Transition } from 'd3-transition'

export default class BarChart extends AxisChart {
  bars?: ChartSelection[]

  constructor(chartParams = {} as ChartParams) {
    super(chartParams)
    this.chartType = 'bar'
  }

  /**
   * Render the chart including bars, axes and labels
   *
   * @method renderChart
   * @param {Boolean} doReset optionally reset the chart data
   * @param {Boolean} doHeightTransition optionally transition height
   */
  renderChart(doReset = false, doHeightTransition = true) {
    super.renderChart()
    const { itemValues, sBarType = 'side' } = this.chartConfig
    const { innerHeight, scaleX, scaleY } = this
    const barWidth = scaleX.bandwidth() / itemValues.length

    this.bars ??= [] as ChartSelection[]

    // Reset bars data and clear graph
    if (doReset) {
      this.bars.forEach((bar: ChartSelection, i: number) => {
        if (!this.d3ChartGroup || !this.bars) return
        this.bars[i] = this.d3ChartGroup
          .selectAll(`rect.bars-${i}`)
          .data([] as any)
        this.bars[i]?.exit().remove()
        this.bars[i] = undefined as unknown as ChartSelection
        bar
      })
      this.bars = []
    }

    // Iterate through config value keys
    itemValues.forEach(({ color, name }: ConfigItemValue, i: number) => {
      if (!this.bars || !this.d3ChartGroup) return
      const iBarOffset = sBarType === 'side' ? barWidth * i : 0
      // Add bars for each value
      if (!this.bars[i]) {
        // Bind bars data
        this.bars[i] = this.d3ChartGroup
          .selectAll(`rect.bars-${i}`)
          .data(this.chartData)
        if (!color) return
        // Add new rect elements and set base attributes
        this.bars[i]
          .enter()
          .append('rect')
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
            if (this.chartConfig.fnClickCallback) {
              this.chartConfig.fnClickCallback({
                oEvent: event,
                jData: d,
              })
            }
          })
          .on('mouseout', (event: MouseEvent) => {
            this.tooltip.hide()
            select(event.target as HTMLElement).attr('fill', color)
          })
          .attr('class', `bars bars-${i}`)
          .attr('fill', color)
          .attr('y', innerHeight)
          .attr('height', 0)
      }

      // Update bars (IIFE used to allow for optional transition)
      ;(() => {
        const d3BarGroup = this.d3ChartGroup.selectAll(`rect.bars-${i}`)
        d3BarGroup
          .data(this.chartData)
          .attr('x', (d: any) => (scaleX(d.itemLabel) ?? 0) + iBarOffset)
          .attr('width', barWidth)
        if (doHeightTransition) {
          return d3BarGroup
            .transition()
            .ease(easeLinear)
            .duration(this.transitionTime)
        }
        return d3BarGroup as unknown as Transition<
          BaseType,
          unknown,
          SVGGElement,
          unknown
        >
      })()
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
