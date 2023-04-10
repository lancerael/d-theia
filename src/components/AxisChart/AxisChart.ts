import { min, max } from 'd3-array'
import { select } from 'd3-selection'
import {
  scaleLinear,
  scaleBand,
  ScaleBand,
  ScaleLinear,
  ScalePoint,
} from 'd3-scale'
import Chart from '../Chart'
import Key from '../Key'
import Axis from '../Axis'
import {
  ChartParams,
  AxisSelection,
  Padding,
  AxisChartConfig,
} from '../../types'

/**
 * A parent class for charts containing X/Y axes and key.
 *
 * @public
 */
export default class AxisChart extends Chart {
  /**
   * The chart's config object
   */
  declare chartConfig: AxisChartConfig

  /**
   * The d3 object for the chart's group

   */
  d3ChartGroup!: AxisSelection

  /**
   * The d3 object for the chart's axis

   */
  axisGroup!: AxisSelection

  /**
   * The chart's x scale
   */
  scaleX: ScaleBand<string> | ScalePoint<string>

  /**
   * The chart's y scale
   */
  scaleY: ScaleLinear<number, number, never>

  /**
   * The chart's min value
   */
  minValue: number = 0

  /**
   * The chart's max value
   */
  maxValue: number = 0

  /**
   * The section of data to show
   */
  dataSlice: number = 0

  /**
   * The padding for the chart within the container
   */
  padding: Padding = {
    l: 45,
    r: 15,
    t: 25,
    b: 60,
  }

  constructor(chartParams = {} as ChartParams) {
    super(chartParams)
    this.padding = chartParams.chartConfig.padding ?? this.padding
    this.scaleY = scaleLinear()
    this.scaleX = scaleBand().padding(0.2)
  }

  /**
   *  Update local scaling objects
   */
  protected setDimensions() {
    super.setDimensions()
    if (!this.chartData) return
    // trim is used to zoom on the data within the range
    const doTrim = this.chartConfig?.doTrim
    let minValue = Number(
      doTrim ? min(this.chartData, (d: any) => min(d.itemValues)) : 0
    )
    let maxValue = Number(max(this.chartData, (d: any) => max(d.itemValues)))
    const dataSlice = Math.ceil(maxValue / 15)
    if (doTrim) {
      const iLowerSection = minValue > dataSlice ? minValue - dataSlice : 0
      minValue = minValue > 0 ? iLowerSection : minValue
      minValue = minValue < 0 ? minValue - dataSlice : minValue
      maxValue += dataSlice
    }
    ;(this.scaleX as ScaleBand<string>)
      .domain(this.chartData.map((d: any) => d.itemLabel))
      .range([0, this.innerWidth])
    this.scaleY
      .domain([minValue, maxValue])
      .range([this.innerHeight, this.padding.t])
    this.minValue = minValue
    this.maxValue = maxValue
    this.dataSlice = dataSlice
  }

  /**
   * Render the chart including axes and labels
   */
  protected renderChart() {
    super.renderChart()
    const { axisLabels, truncateSize = 10 } = this.chartConfig ?? {}
    const { innerWidth, innerHeight, scaleX, scaleY, padding } = this

    // Add chart scale axes
    this.axisGroup ??= this.d3Svg.append('g').attr('class', 'axes-g')
    this.axis = new Axis({
      d3Container: this.axisGroup,
      truncateSize,
      axisLabels,
      scaleX,
      scaleY,
      padding,
      width: innerWidth,
      height: innerHeight,
      tooltip: this.tooltip,
    }).render()

    // Add chart container group
    this.d3ChartGroup ??= this.d3Svg
      .append('g')
      .attr('transform', `translate(${this.padding.l}, 0)`)

    // Render the key for the data
    this.key = new Key({
      d3Container: select(this.svg),
      itemValues: this.chartConfig.itemValues,
      offsetX: this.innerWidth / 2 + this.padding.l,
      offsetY: this.height - 20,
    }).render()
  }
}
