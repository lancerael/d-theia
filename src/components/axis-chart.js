import * as d3 from 'd3';
import Chart from './chart';
import Key from './key';
import Axis from './axis';

/**
* Create AxisChart from the supplied data, based on the supplied JSON config.
*
* @class AxisChart
* @extends Chart
* @constructor
*/
export default class AxisChart extends Chart {
  d3ChartGroup;
  d3AxisGroup;
  oAxis;
  oKey;

  /**
  * Constructor function supersedes parent class.
  *
  * @method constructor
  * @param {Object} oParams same as Chart
  */
  constructor(oParams = {}) {
    super(oParams);
    this.jPadding = { l: 45, r: 15, t: 25, b: 90 };
    this.oScaleX = d3.scaleBand().padding(0.2);
    this.oScaleY = d3.scaleLinear();
  }

  /**
  * Supersede the parent method to update local scaling objects
  *
  * @method setDimensions
  */
  setDimensions() {
    super.setDimensions();
    this.oScaleX
      .domain(this.aData.map(d => d.sLabel))
      .range([0, this.iInnerWidth]);
    this.oScaleY
      .domain([0, d3.max(this.aData, d => d3.max(d.aValues))])
      .range([this.iInnerHeight, this.jPadding.t]);
  }

  /**
  * Render the chart including axes and labels
  *
  * @method renderChart
  */
  renderChart() {
    const { aAxisLabels, iTruncate } = this.jConfig;
    const { iInnerWidth, iInnerHeight, oScaleX, oScaleY, jPadding } = this;

    // Add chart scale axes
    this.d3AxisGroup = this.d3AxisGroup || this.d3Svg.append('g').attr('class', 'axes-g');
    this.oAxis = new Axis({
      d3Container: this.d3AxisGroup,
      iTruncate,
      aAxisLabels,
      oScaleX,
      oScaleY,
      jPadding,
      iWidth: iInnerWidth,
      iHeight: iInnerHeight,
      oToolTip: this.oToolTip }).render();

    // Add chart container group
    this.d3ChartGroup = this.d3ChartGroup || this.d3Svg.append('g').attr('transform', `translate(${this.jPadding.l}, 0)`);

    // Render the key for the data
    this.oKey = new Key({
      d3Container: d3.select(this.oSvg),
      aValues: this.jConfig.aValues,
      iOffsetX: (this.iInnerWidth / 2) + this.jPadding.l,
      iOffsetY: this.iHeight - 20
    }).render();
  }

}

module.exports = AxisChart;
