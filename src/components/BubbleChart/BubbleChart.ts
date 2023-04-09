import { forceSimulation, forceManyBody, forceCenter } from 'd3-force'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import { easeLinear } from 'd3-ease'
import { scaleLinear } from 'd3-scale'
import 'd3-transition'
import Chart from '../Chart'
import Axis from '../Axis'
import Key from '../Key'

/**
 * Create BubbleCharts from the supplied data, based on the supplied JSON config.
 *
 * @class BubbleChart
 * @extends {Chart}
 * @constructor
 */
export default class BubbleChart extends Chart {
  /**
   * The local collection of bubbles
   *
   * @property aBubbles
   * @type {Array}
   */
  aBubbles: any

  /**
   * The color scale
   *
   * @property oScaleColor
   * @type {Object}
   */
  oScaleColor: any

  /**
   * The axis group
   *
   * @property d3AxisGroup
   * @type {Object}
   */
  d3AxisGroup: any

  /**
   * The bubbles group
   *
   * @property d3BubblesGroup
   * @type {Object}
   */
  d3BubblesGroup: any

  /**
   * The force simulation
   *
   * @property oForce
   * @type {Object}
   */
  oForce: any

  /**
   * The circles
   *
   * @property d3Circles
   * @type {Object}
   */
  d3Circles: any

  /**
   * Constructor function supersedes parent class.
   *
   * @method constructor
   * @param {Object} oParams same as Chart
   */
  constructor(oParams = {}) {
    super(oParams)
    this.oScaleColor = scaleLinear()
    this.sChartType = 'bubble'
  }

  /**
   * Supersede the parent method to update local scaling objects
   *
   * @method setDimensions
   */
  setDimensions() {
    super.setDimensions()
    this.oScaleColor
      .domain([0, max(this.aData, (d: any) => d[this.jConfig.aValues[1].sKey])])
      .range(this.jConfig.aValues[1].aColors)
  }

  /**
   * Render the chart including bubbles, axes and labels
   *
   * @method renderChart
   */
  renderChart() {
    const { aAxisLabels, aValues } = this.jConfig
    const { iInnerWidth, iInnerHeight, jPadding } = this
    const { sKey: sKey1, sName: sName1 } = aValues[0]
    const { sKey: sKey2, sName: sName2, aColors } = aValues[1]

    // Add chart scale axes
    this.d3AxisGroup ??= this.d3Svg.append('g').attr('class', 'axes-g')
    this.oAxis = new Axis({
      d3Container: this.d3AxisGroup,
      aAxisLabels,
      jPadding,
      iWidth: iInnerWidth,
      iHeight: iInnerHeight - 25,
    }).renderLabels()

    // Add the group container for bubbles
    this.d3BubblesGroup ??= this.d3Svg
      .append('g')
      .attr('transform', `translate(${this.jPadding.l}, 0)`)

    // The method runs on each tick of the force calculation to reposition the bubbles
    const fnTicked = () => {
      this.d3BubblesGroup
        .selectAll('circle')
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y)
    }

    // Initialise the d3 force calculations
    this.oForce = forceSimulation()
      .nodes(JSON.parse(JSON.stringify(this.aData)))
      .force(
        'charge',
        forceManyBody().strength((d: any) => (d[sKey1] * (d[sKey1] / 2)) / -150)
      )
      .force('center', forceCenter(this.iWidth / 2, this.iHeight / 2))
      .on('tick', () => {
        fnTicked()
      })

    // Add circles for each value
    if (!this.d3Circles) {
      // Bind bars data
      this.d3Circles = this.d3BubblesGroup
        .selectAll('circle.circles')
        .data(this.oForce.nodes())
      // Add new rect elements and set base attributes
      this.d3Circles
        .enter()
        .append('circle')
        .on('mousemove', (event: MouseEvent, d: any) => {
          this.oTooltip.ping(
            `<strong>${d.sLabel}</strong><br>${sName1}: <em>${d[sKey1]}</em><br>${sName2}: <em>${d[sKey2]}</em>`,
            event
          )
        })
        .on('mouseout', () => this.oTooltip.hide())
        .attr('class', 'circles')
        .attr('fill', (d: any) => this.oScaleColor(d[sKey2]))
        .attr('r', 0)
        .transition()
        .ease(easeLinear)
        .duration(this.iTransitionTime)
        .attr('r', (d: any) => d[sKey1] / 2)
    } else {
      this.d3BubblesGroup.attr(
        'transform',
        `translate(${this.iResizeOffset / 2}, 0)`
      )
    }

    // Render the key for the data
    this.oKey = new Key({
      d3Container: select(this.dSvg),
      aValues: [
        {
          sName: 0,
          sColor: aColors[0],
        },
        {
          sName: this.oScaleColor.domain()[1],
          sColor: aColors[1],
        },
      ],
      iOffsetX: this.iInnerWidth / 2 + this.jPadding.l + 10,
      iOffsetY: this.iHeight - 20,
      sType: 'range',
    }).render()
  }
}
