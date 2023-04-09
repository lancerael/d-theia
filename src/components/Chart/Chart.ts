import { select } from 'd3-selection'
import Tooltip from '../Tooltip'
import { addColoursToConfig, transformDataKeys } from '../../utilities'

/**
 * The Chart object is the parent class for all types of Chart.
 * It is used to initialise all of the base settings universal to all charts.
 *
 * @class Chart
 * @constructor
 */
export default class Chart {
  /**
   * SVG DOM object for displaying the chart
   *
   * @property svg
   * @type {Object}
   */
  svg

  /**
   * SVG d3 object for d3 operations on the chart
   *
   * @property d3Svg
   * @type {Object}
   */
  d3Svg

  /**
   * Default time for d3 transitions on the chart
   *
   * @property transitionTime
   * @type {Number}
   */
  transitionTime

  /**
   * DOM reference to container element that wraps SVG
   *
   * @property container
   * @type {Object}
   */
  container: any

  /**
   * DOM reference to loader display element
   *
   * @property loader
   * @type {Object}
   */
  loader

  /**
   * d3 reference to chart title element
   *
   * @property d3Title
   * @type {Object}
   */
  d3Title: any

  /**
   * Chart's tooltip object
   *
   * @property tooltip
   * @type {Object}
   */
  tooltip: any

  /**
   * The current calculated width of the chart
   *
   * @property width
   * @type {Number}
   */
  width: any

  /**
   * The current calculated height of the chart
   *
   * @property height
   * @type {Number}
   */
  height: any

  /**
   * The current calculated inner width of the chart
   *
   * @property innerWidth
   * @type {Number}
   */
  innerWidth: any

  /**
   * The current calculated inner height of the chart
   *
   * @property innerHeight
   * @type {Number}
   */
  innerHeight: any

  /**
   * The width before any browser resize
   *
   * @property initialWidth
   * @type {Number}
   */
  initialWidth: any

  /**
   * The padding for the chart within the container
   *
   * @property padding
   * @type {Object}
   */
  padding

  /**
   * The chart's config object
   *
   * @property chartConfig
   * @type {Object}
   */
  chartConfig: any

  /**
   * The chart's data
   *
   * @property chartData
   * @type {Array}
   */
  chartData: any

  /**
   * The chart's type
   *
   * @property chartType
   * @type {string}
   */
  chartType: any

  /**
   * The chart's key
   *
   * @property key
   * @type {Object}
   */
  key: any

  /**
   * The chart's axis
   *
   * @property axis
   * @type {Object}
   */
  axis: any

  /**
   * The chart's axis
   *
   * @property resizeWatcher
   * @type {Object}
   */
  resizeWatcher: any

  /**
   * The chart's axis
   *
   * @property chartOutWatcher
   * @type {Object}
   */
  chartOutWatcher: any

  /**
   * The chart's resize offset
   *
   * @property resizeOffset
   * @type {number}
   */
  resizeOffset: any

  /**
   * Transform keys from an unknown data schema
   *
   * @property doTransform
   * @type {boolean}
   */
  doTransform: boolean

  /**
   * Constructor function that sets up the local object.
   *
   * @method constructor
   * @param {Object} chartConfig JSON configuration object
   * @param {Array} chartData the data to be displayed
   * @param {String} containerId Optional ID to select DOM object
   * @param {Object} container Optional DOM object in place of ID
   */
  constructor(chartParams: any = {}) {
    const { chartConfig, chartData, containerId, bAddColors, doTransform } =
      chartParams
    let { container } = chartParams
    this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    this.d3Svg = select(this.svg)
    this.transitionTime = 500
    this.padding = chartConfig?.padding ?? { l: 5, r: 5, t: 5, b: 5 }
    this.loader = document.createElement('div')
    this.doTransform = doTransform
    if (!container && containerId) {
      container = document.getElementById(containerId)
    }
    if (container) {
      this.setContainer(container)
    }
    if (chartConfig) {
      this.setConfig(chartConfig, bAddColors)
    }
    if (chartData) {
      this.setData(chartData)
    }
  }

  /**
   * Sets the local container object.
   *
   * @method setContainer
   * @param {Object} container Required DOM element
   * @throws {Error} invalid DOM element
   */
  setContainer(container: any) {
    if (container.nodeName) {
      container.appendChild(this.loader)
      this.container = container
    } else {
      throw new Error('No valid DOM element or ID provided for chart.')
    }
  }

  /**
   * Sets the local config options for the chart.
   *
   * @method setConfig
   * @param {Object} chartConfig JSON configuration object
   * @throws {Error} missing configuration
   */
  setConfig(chartConfig: any, bAddColors = false) {
    const shouldUpdateTrim = this.chartConfig?.doTrim !== chartConfig?.doTrim
    if (chartConfig && chartConfig.toString() === '[object Object]') {
      this.chartConfig = structuredClone(chartConfig)
      if (this.chartConfig.itemValues && bAddColors) {
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
   * @method setData
   * @param {Array} chartData array of JSON objects
   * @param {Boolean} doTransform transform mapped data
   * @throws {Error} missing data
   */
  setData(chartData: any) {
    if (chartData && Array.isArray(chartData) === true) {
      this.chartData = structuredClone(chartData)
      if (this.chartConfig && this.doTransform) {
        this.chartData = transformDataKeys(this.chartConfig, this.chartData)
      }
    } else {
      throw new Error('No valid data provided for chart.')
    }
  }

  /**
   * Updates the local data for the chart.
   *
   * @method updateData
   * @param {Array} chartData array of JSON objects
   * @param {Boolean} doTransform transform mapped data
   */
  updateData(chartData: any, bRender = true) {
    const doReset = chartData.length != this.chartData.length
    this.setData(chartData)
    this.setDimensions()
    if (this.axis) {
      this.axis.render()
    }
    if (this.renderChart && bRender) {
      this.renderChart(doReset)
    }
  }

  /**
   * Updates the local config for the chart.
   *
   * @method updateConfig
   * @param {JSON} chartConfig config JSON style object
   */
  updateConfig(
    chartConfig: any,
    doResetDimensions = false,
    bTransition = false
  ) {
    this.setConfig(chartConfig)
    if (doResetDimensions) {
      this.setDimensions()
    }
    if (this.renderChart) {
      this.renderChart(true, bTransition)
    }
  }

  /**
   * Sets the local chart dimensions based on the size of the container.
   *
   * @method setDimensions
   * @throws {Error} missing DOM element
   */
  setDimensions() {
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
   *
   * @method renderChart
   */
  renderChart(...args: any) {
    if (this.d3Title) {
      this.d3Title.text(this.chartConfig.title)
    }
    args
  }

  /**
   * Check chart is ready and render.
   *
   * @method init
   * @throws {Error} chart not ready for initialisation
   * @chainable
   */
  init() {
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
        this.tooltip.hide()
      })
      this.chartOutWatcher ??= this.svg.addEventListener('mouseout', () => {
        this.tooltip.hide()
      })
      if (this.renderChart) {
        this.renderChart()
      }
      this.container.removeChild(this.loader)
      return this
    }
    throw new Error('The chart is not ready for initialisation.')
  }
}
