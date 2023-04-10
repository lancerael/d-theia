import { forceSimulation, forceManyBody, forceCenter } from 'd3-force'
import { max } from 'd3-array'
import { select } from 'd3-selection'
import { easeLinear } from 'd3-ease'
import { scaleLinear } from 'd3-scale'
import 'd3-transition'
import Chart from '../Chart'
import Axis from '../Axis'
import Key from '../Key'
import { ChartParams } from '../../types'

/**
 * Create BubbleCharts from the supplied data, based on the supplied JSON config.
 *
 * @public
 */
export default class BubbleChart extends Chart {
  /**
   * The local collection of bubbles
   */
  bubbles: any

  /**
   * The color scale
   */
  scaleColor: any

  /**
   * The axis group
   */
  axisGroup: any

  /**
   * The bubbles group
   */
  bubblesGroup: any

  /**
   * The force simulation
   */
  force: any

  /**
   * The circles
   */
  circles: any

  constructor(chartParams = {} as ChartParams) {
    super(chartParams)
    this.scaleColor = scaleLinear()
    this.chartType = 'bubble'
  }

  /**
   * Update local scaling objects
   */
  setDimensions() {
    super.setDimensions()
    this.scaleColor
      .domain([
        0,
        max(
          this.chartData,
          (d: any) => d[this.chartConfig.itemValues[1].key as string]
        ),
      ])
      .range(this.chartConfig.itemValues[1].colors)
  }

  /**
   * Render the chart including bubbles, axes and labels
   */
  public renderChart() {
    const { axisLabels, itemValues } = this.chartConfig
    const { innerWidth, innerHeight, padding } = this
    const { key: key1, name: name1 } = itemValues[0]
    const { key: key2, name: name2, colors } = itemValues[1]

    if (!key1 || !key2) return

    // Add chart scale axes
    this.axisGroup ??= this.d3Svg.append('g').attr('class', 'axes-g')
    this.axis = new Axis({
      d3Container: this.axisGroup,
      axisLabels,
      padding,
      width: innerWidth,
      height: innerHeight - 25,
    }).renderLabels()

    // Add the group container for bubbles
    this.bubblesGroup ??= this.d3Svg
      .append('g')
      .attr('transform', `translate(${this.padding.l}, 0)`)

    // The method runs on each tick of the force calculation to reposition the bubbles
    const fnTicked = () => {
      this.bubblesGroup
        .selectAll('circle')
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y)
    }

    // Initialise the d3 force calculations
    this.force = forceSimulation()
      .nodes(JSON.parse(JSON.stringify(this.chartData)))
      .force(
        'charge',
        forceManyBody().strength((d: any) => (d[key1] * (d[key1] / 2)) / -150)
      )
      .force('center', forceCenter(this.width / 2, this.height / 2))
      .on('tick', () => {
        fnTicked()
      })

    // Add circles for each value
    if (!this.circles) {
      // Bind bars data
      this.circles = this.bubblesGroup
        .selectAll('circle.circles')
        .data(this.force.nodes())
      // Add new rect elements and set base attributes
      this.circles
        .enter()
        .append('circle')
        .on('mousemove', (event: MouseEvent, d: any) => {
          this.tooltip.ping(
            `<strong>${d.itemLabel}</strong><br>${name1}: <em>${d[key1]}</em><br>${name2}: <em>${d[key2]}</em>`,
            event
          )
        })
        .on('mouseout', () => this.tooltip.hide())
        .attr('class', 'circles')
        .attr('fill', (d: any) => this.scaleColor(d[key2]))
        .attr('r', 0)
        .transition()
        .ease(easeLinear)
        .duration(this.transitionTime)
        .attr('r', (d: any) => d[key1] / 2)
    } else {
      this.bubblesGroup.attr(
        'transform',
        `translate(${this.resizeOffset / 2}, 0)`
      )
    }

    if (!colors) return

    // Render the key for the data
    this.key = new Key({
      d3Container: select(this.svg),
      itemValues: [
        {
          name: 0,
          color: colors[0],
        },
        {
          name: this.scaleColor.domain()[1],
          color: colors[1],
        },
      ],
      offsetX: this.innerWidth / 2 + this.padding.l + 10,
      offsetY: this.height - 20,
      chartType: 'range',
    }).render()
  }
}
