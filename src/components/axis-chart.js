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
    this.oScaleY = d3.scaleLinear();
  }

  /**
  * Supersede the parent method to update local scaling objects
  *
  * @method setDimensions
  */
  setDimensions() {
    super.setDimensions();
    const bTrim = this.jConfig.bTrim;
    let iMinValue = bTrim ? d3.min(this.aData, d => d3.min(d.aValues)) : 0;
    let iMaxValue = d3.max(this.aData, d => d3.max(d.aValues));
    const iSection = Math.ceil(iMaxValue / 15);
    if (bTrim) {
      const iLowerSection = iMinValue > iSection ? iMinValue - iSection : 0;
      iMinValue = iMinValue > 0 ? iLowerSection : iMinValue;
      iMinValue = iMinValue < 0 ? iMinValue - iSection : iMinValue;
      iMaxValue += iSection;
    }
    this.oScaleX
      .domain(this.aData.map(d => d.sLabel))
      .range([0, this.iInnerWidth]);
    this.oScaleY
      .domain([iMinValue, iMaxValue])
      .range([this.iInnerHeight, this.jPadding.t]);
    this.iMinValue = iMinValue;
    this.iMaxValue = iMaxValue;
    this.iSection = iSection;
  }

  /**
  * Render the chart including axes and labels
  *
  * @method renderChart
  */
  renderChart() {
    const { aAxisLabels, iTruncate = 15 } = this.jConfig;
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
