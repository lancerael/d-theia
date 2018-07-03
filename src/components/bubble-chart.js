import * as d3 from 'd3';
import Chart from './chart';
import Axis from './axis';
import Key from './key';

/**
* Create BubbleCharts from the supplied data, based on the supplied JSON config.
*
* @class BubbleChart
* @extends Chart
* @constructor
*/
export default class BubbleChart extends Chart {
  aBubbles;

  /**
  * Constructor function supersedes parent class.
  *
  * @method constructor
  * @param {Object} oParams same as Chart
  */
  constructor(oParams = {}) {
    super(oParams);
    this.oScaleColour = d3.scaleLinear();
    this.sChartType = 'bubble';
  }

  /**
  * Supersede the parent method to update local scaling objects
  *
  * @method setDimensions
  */
  setDimensions() {
    super.setDimensions();
    this.oScaleColour
      .domain([0, d3.max(this.aData, d => d[this.jConfig.aValues[1].sKey])])
      .range(this.jConfig.aValues[1].aColours);
  }

  /**
  * Render the chart including bubbles, axes and labels
  *
  * @method renderChart
  */
  renderChart() {
    const { aAxisLabels, aValues } = this.jConfig;
    const { iInnerWidth, iInnerHeight, jPadding } = this;
    const { sKey: sKey1, sName: sName1 } = aValues[0];
    const { sKey: sKey2, sName: sName2, aColours } = aValues[1];

    // Add chart scale axes
    this.d3AxisGroup = this.d3AxisGroup || this.d3Svg.append('g').attr('class', 'axes-g');
    this.oAxis = new Axis({
      d3Container: this.d3AxisGroup,
      aAxisLabels,
      jPadding,
      iWidth: iInnerWidth,
      iHeight: iInnerHeight - 25 }).renderLabels();

    // Add the group container for bubbles
    this.d3BubblesGroup = this.d3BubblesGroup || this.d3Svg.append('g').attr('transform', `translate(${this.jPadding.l}, 0)`);

    // The method runs on each tick of the force calculation to reposition the bubbles
    const fnTicked = () => {
      this.d3BubblesGroup.selectAll('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    };

    // Initialise the d3 force calculations
    this.oForce = d3.forceSimulation()
      .nodes(JSON.parse(JSON.stringify(this.aData)))
      .force('charge', d3.forceManyBody().strength(d => (d[sKey1] * (d[sKey1] / 2)) / -150))
      .force('center', d3.forceCenter(this.iWidth / 2, this.iHeight / 2))
      .on('tick', () => {
        fnTicked();
      });

    // Add circles for each value
    if (!this.d3Circles) {
      // Bind bars data
      this.d3Circles = this.d3BubblesGroup.selectAll('circle.circles').data(this.oForce.nodes());
      // Add new rect elements and set base attributes
      this.d3Circles
        .enter()
        .append('circle')
        .on('mousemove', (d) => {
          this.oToolTip.ping(`<strong>${d.sLabel}</strong><br>${sName1}: <em>${d[sKey1]}</em><br>${sName2}: <em>${d[sKey2]}</em>`);
        })
        .on('mouseout', () => this.oToolTip.hide())
        .attr('class', 'circles')
        .attr('fill', d => this.oScaleColour(d[sKey2]))
        .attr('r', 0)
        .transition()
        .ease(d3.easeLinear)
        .duration(this.iTransitionTime)
        .attr('r', d => d[sKey1] / 2);
    } else {
      this.d3BubblesGroup.attr('transform', `translate(${this.iResizeOffset / 2}, 0)`);
    }

    // Render the key for the data
    this.oKey = new Key({
      d3Container: d3.select(this.dSvg),
      aValues: [
        {
          sName: 0,
          sColour: aColours[0]
        },
        {
          sName: this.oScaleColour.domain()[1],
          sColour: aColours[1]
        }
      ],
      iOffsetX: (this.iInnerWidth / 2) + this.jPadding.l + 10,
      iOffsetY: this.iHeight - 20,
      sType: 'range'
    }).render();
  }

}

module.exports = BubbleChart;
