import { line } from 'd3-shape'
import { select } from 'd3-selection'
import { scalePoint } from 'd3-scale'
import { rgb } from 'd3-color'
import AxisChart from '../AxisChart'

/**
 * Create LineCharts from the supplied data, based on the JSON config.
 *
 * @class LineChart
 * @extends {AxisChart}
 * @constructor
 */
export default class LineChart extends AxisChart {
  /**
   * The local collection of lines
   *
   * @property lines
   * @type {Array}
   */
  lines: any

  /**
   * The local collection of circles
   *
   * @property circles
   * @type {Array}
   */
  circles: any

  /**
   * Constructor used to set chart type
   *
   * @method constructor
   */
  constructor(chartParams = {}) {
    super(chartParams)
    this.chartType = 'line'
    this.scaleX = scalePoint()
  }

  /**
   * Render the chart including lines, axes and labels
   *
   * @method renderChart
   */
  renderChart(doReset = false) {
    super.renderChart()
    const { itemValues } = this.chartConfig
    const { scaleX, scaleY } = this

    this.lines ??= []
    this.circles ??= []

    // Reset lines data and clear graph
    if (doReset) {
      this.lines.forEach((dtLine: any, i: number) => {
        this.lines[i] = this.d3ChartGroup.selectAll(`path.lines-${i}`).data([])
        this.lines[i].exit().remove()
        this.lines[i] = undefined
        dtLine
      })
      this.lines = []
    }

    // Reset circles data and clear graph
    if (doReset) {
      this.circles.forEach((dtLine: any, i: number) => {
        this.circles[i] = this.d3ChartGroup
          .selectAll(`circle.circles-${i}`)
          .data([])
        this.circles[i].exit().remove()
        this.circles[i] = undefined
        dtLine
      })
      this.circles = []
    }

    // Iterate through config value keys
    itemValues.forEach(({ color, name }: any, i: number) => {
      if (!this.lines[i]) {
        // define the line
        this.lines[i] = line()

        // Add the valueline path.
        this.d3ChartGroup
          .append('path')
          .data([this.chartData])
          .attr('class', `line lines-${i}`)
          .attr('stroke', color)
      }

      // Update lines
      this.lines[i]
        .x((d: any) => scaleX(d.itemLabel) + scaleX.bandwidth() / 2)
        .y((d: any) => scaleY(d.itemValues[i]))
      this.d3ChartGroup
        .selectAll(`path.lines-${i}`)
        .data([this.chartData])
        .attr('d', this.lines[i])

      // Add circles for each value
      if (!this.circles[i]) {
        // Bind circles data
        this.circles[i] = this.d3ChartGroup
          .selectAll(`circle.circles-${i}`)
          .data(this.chartData)
        // Add new circle elements and set base attributes
        this.circles[i]
          .enter()
          .append('circle')
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
          .attr('class', `circles circles-${i}`)
          .attr('fill', color)
          .attr('r', 5)
      }

      // Update circles
      this.d3ChartGroup
        .selectAll(`circle.circles-${i}`)
        .data(this.chartData)
        .attr('cy', (d: any) => scaleY(d.itemValues[i]))
        .attr('cx', (d: any) => scaleX(d.itemLabel) + scaleX.bandwidth() / 2)
    })
  }
}
