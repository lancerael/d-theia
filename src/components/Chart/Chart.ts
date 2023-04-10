import { select } from 'd3-selection'
import Tooltip from '../Tooltip'
import { addColoursToConfig, transformDataKeys } from '../../utilities'

import {
  ChartConfig,
  ChartData,
  ChartEventListener,
  ChartParams,
  ChartType,
  DivSelection,
  Padding,
  SVGSelection,
} from '../../types'
import Key from '../Key/Key'
import Axis from '../Axis/Axis'

/**
 * The parent class for all types of Chart used to initialise all of the base settings universal to all charts.
 * In handles data setting/updating, document resizing and includes the tooltip.
 *
 * @public
 */
export default class Chart {
  /**
   * SVG DOM object for displaying the chart
   */
  protected svg: SVGSVGElement

  /**
   * SVG d3 object for d3 operations on the chart
   */
  protected d3Svg: SVGSelection

  /**
   * Default time for d3 transitions on the chart
   */
  protected transitionTime: number = 300

  /**
   * DOM reference to container element that wraps SVG
   */
  private container!: HTMLElement

  /**
   * DOM reference to loader display element
   */
  private loader: HTMLElement

  /**
   * d3 reference to chart title element
   */
  private d3Title?: DivSelection

  /**
   * Chart's tooltip object instance
   */
  protected tooltip!: Tooltip

  /**
   * The current calculated width of the chart
   */
  protected width!: number

  /**
   * The current calculated height of the chart
   */
  protected height!: number

  /**
   * The current calculated inner width of the chart
   */
  protected innerWidth!: number

  /**
   * The current calculated inner height of the chart
   */
  protected innerHeight!: number

  /**
   * The width before any browser resize
   */
  private initialWidth!: number

  /**
   * The padding for the chart within the container
   */
  protected padding: Padding = {
    l: 5,
    r: 5,
    t: 5,
    b: 5,
  }

  /**
   * The chart's config object
   */
  protected chartConfig!: ChartConfig

  /**
   * The chart's data array
   */
  protected chartData!: ChartData

  /**
   * The chart's type
   */
  protected chartType: ChartType = 'bar'

  /**
   * The chart's key object instance
   */
  protected key!: Key

  /**
   * The chart's axis object instance
   */
  protected axis!: Axis

  /**
   *  An event watcher for the user resizing the browser
   */
  protected resizeWatcher!: ChartEventListener

  /**
   * An event watcher for the user moving the mouse out of the chart
   */
  protected chartOutWatcher!: ChartEventListener

  /**
   * The chart's resize offset
   */
  protected resizeOffset: number = 0

  /**
   * Whether to transform keys from an unknown data schema
   */
  protected doTransform: boolean

  constructor(chartParams = {} as ChartParams) {
    const {
      chartConfig,
      chartData,
      containerId,
      shouldAddColors,
      doTransform,
      transitionTime,
      container,
    } = chartParams
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    this.d3Svg = select(this.svg)
    this.transitionTime = transitionTime ?? this.transitionTime
    this.padding = chartConfig?.padding ?? this.padding
    this.loader = document.createElement('div')
    this.doTransform = Boolean(doTransform)
    this.setContainer(container ?? document.getElementById(containerId ?? ''))
    this.setConfig(chartConfig, shouldAddColors)
    this.setData(chartData)
  }

  /**
   * Sets the local container object.
   *#
   * @param {HTMLElement} container Required DOM element
   * @throws {Error} invalid DOM element
   */
  private setContainer = (container: HTMLElement | null) => {
    if (container?.nodeName) {
      container.appendChild(this.loader)
      this.container = container
    } else {
      throw new Error('No valid DOM element or ID provided for chart.')
    }
  }

  /**
   * Sets the local config options for the chart.
   *
   * @param {ChartConfig} chartConfig JSON configuration object
   * @param {boolean} shouldAddColors determine whether to add random colours to the config
   * @throws {Error} missing configuration
   */
  private setConfig = (chartConfig: ChartConfig, shouldAddColors = false) => {
    const shouldUpdateTrim = this.chartConfig?.doTrim !== chartConfig?.doTrim
    if (chartConfig && chartConfig.toString() === '[object Object]') {
      this.chartConfig = structuredClone(chartConfig)
      if (this.chartConfig?.itemValues && shouldAddColors) {
        this.chartConfig.itemValues = addColoursToConfig(
          this.chartConfig.itemValues
        )
      }
      shouldUpdateTrim && this.setDimensions()
    } else {
      throw new Error('No valid configuration provided for chart.')
    }
  }

  /**
   * Sets the local data for the chart.
   *
   * @param {ChartData} chartData array of JSON objects
   * @throws {Error} missing data
   */
  private setData = (chartData: ChartData) => {
    if (chartData && Array.isArray(chartData) === true) {
      this.chartData = structuredClone(chartData)
      if (this.chartConfig && this.chartData && this.doTransform) {
        this.chartData = transformDataKeys(this.chartConfig, this.chartData)
      }
    } else {
      throw new Error('No valid data provided for chart.')
    }
  }

  /**
   * Updates the local config for the chart.
   *
   * @method updateConfig
   * @param {ChartConfig} chartConfig config JSON style object
   */
  public updateConfig(chartConfig: ChartConfig) {
    this.setConfig(chartConfig)
    if (this.renderChart) {
      this.renderChart()
    }
  }

  /**
   * Updates the local data for the chart.
   *
   * @param {ChartData} chartData array of JSON objects
   */
  public updateData(chartData: ChartData, bRender = true) {
    this.setData(chartData)
    this.setDimensions()
    if (this.axis) {
      this.axis.render()
    }
    if (this.renderChart && bRender) {
      this.renderChart()
    }
  }

  /**
   * Sets the local chart dimensions based on the size of the container.
   *
   * @method setDimensions
   * @throws {Error} missing DOM element
   */
  protected setDimensions() {
    if (this.container && this.container.nodeName) {
      this.width = this.container.clientWidth
      this.height = this.container.clientHeight
      this.innerWidth = this.width - this.padding.l - this.padding.r
      this.innerHeight = this.height - this.padding.t - this.padding.b
    } else {
      throw new Error(
        'Cannot set dimensions of chart without container element.'
      )
    }
  }

  /**
   * Render the chart
   */
  protected renderChart() {
    if (this.d3Title && this.chartConfig?.title) {
      this.d3Title.text(this.chartConfig.title)
    }
  }

  /**
   * Check chart is ready and render.
   *
   * @throws {Error} chart not ready for initialisation
   */
  public init() {
    if (!this.container) return
    this.setDimensions()
    if (
      this.chartData &&
      this.chartConfig &&
      !isNaN(this.width) &&
      !isNaN(this.height)
    ) {
      this.initialWidth = this.width
      this.tooltip = new Tooltip(this.container).create()
      this.d3Title = select(this.container).append('div').attr('class', 'title')
      this.svg.setAttribute('class', 'chart')
      this.container.appendChild(this.svg)
      this.resizeWatcher ??= window.addEventListener('resize', () => {
        this.setDimensions()
        this.resizeOffset = this.width - this.initialWidth
        if (this.renderChart) {
          this.renderChart()
        }
        this.tooltip?.hide()
      })
      this.chartOutWatcher ??= this.svg.addEventListener('mouseout', () => {
        this.tooltip?.hide()
      })
      if (this.renderChart) {
        this.renderChart()
      }
      this.loader && this.container.removeChild(this.loader)
      return this
    }
    throw new Error('The chart is not ready for initialisation.')
  }
}
