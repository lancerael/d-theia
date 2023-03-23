import { line } from 'd3-shape'
import { select, event } from 'd3-selection'
import { scalePoint } from 'd3-scale'
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
   * @property aLines
   * @type {Array}
   */
  aLines: any

  /**
   * The local collection of circles
   *
   * @property aCircles
   * @type {Array}
   */
  aCircles: any

  /**
   * Constructor used to set chart type
   *
   * @method constructor
   */
  constructor(oParams = {}) {
    super(oParams)
    this.sChartType = 'line'
    this.oScaleX = scalePoint()
  }

  /**
   * Render the chart including lines, axes and labels
   *
   * @method renderChart
   */
  renderChart(bReset = false) {
    super.renderChart()
    const { aValues } = this.jConfig
    const { oScaleX, oScaleY } = this

    this.aLines = this.aLines || []
    this.aCircles = this.aCircles || []

    // Reset lines data and clear graph
    if (bReset) {
      this.aLines.forEach((dtLine: any, i: number) => {
        this.aLines[i] = this.d3ChartGroup.selectAll(`path.lines-${i}`).data([])
        this.aLines[i].exit().remove()
        this.aLines[i] = undefined
        dtLine
      })
      this.aLines = []
    }

    // Reset circles data and clear graph
    if (bReset) {
      this.aCircles.forEach((dtLine: any, i: number) => {
        this.aCircles[i] = this.d3ChartGroup
          .selectAll(`circle.circles-${i}`)
          .data([])
        this.aCircles[i].exit().remove()
        this.aCircles[i] = undefined
        dtLine
      })
      this.aCircles = []
    }

    // Iterate through config value keys
    aValues.forEach((oValues: any, i: number) => {
      const { oColor } = oValues

      if (!this.aLines[i]) {
        // define the line
        this.aLines[i] = line()

        // Add the valueline path.
        this.d3ChartGroup
          .append('path')
          .data([this.aData])
          .attr('class', `line lines-${i}`)
          .attr('stroke', oColor)
      }

      // Update lines
      this.aLines[i]
        .x((d: any) => oScaleX(d.sLabel) + oScaleX.bandwidth() / 2)
        .y((d: any) => oScaleY(d.aValues[i]))
      this.d3ChartGroup
        .selectAll(`path.lines-${i}`)
        .data([this.aData])
        .attr('d', this.aLines[i])

      // Add circles for each value
      if (!this.aCircles[i]) {
        // Bind circles data
        this.aCircles[i] = this.d3ChartGroup
          .selectAll(`circle.circles-${i}`)
          .data(this.aData)
        // Add new circle elements and set base attributes
        this.aCircles[i]
          .enter()
          .append('circle')
          .on('mousemove', (d: any) => {
            this.oTooltip.ping([d.sLabel, oValues.sName, d.aValues[i]])
          })
          .on('mouseover', (d: any) => {
            d.oColor = this.jConfig.aValues[i].oColor
            select(event.target).attr('fill', d.oColor.darker(1))
          })
          .on('mousedown', (d: any) => {
            if (this.jConfig.fnClickCallback) {
              this.jConfig.fnClickCallback({
                oEvent: event,
                jData: d,
              })
            }
          })
          .on('mouseout', (d: any) => {
            this.oTooltip.hide()
            select(event.target).attr('fill', d.oColor)
          })
          .attr('class', `circles circles-${i}`)
          .attr('fill', oColor)
          .attr('r', 5)
      }

      // Update circles
      this.d3ChartGroup
        .selectAll(`circle.circles-${i}`)
        .data(this.aData)
        .attr('cy', (d: any) => oScaleY(d.aValues[i]))
        .attr('cx', (d: any) => oScaleX(d.sLabel) + oScaleX.bandwidth() / 2)
    })
  }
}
