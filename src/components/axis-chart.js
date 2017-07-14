const d3 = require('d3');
const Theia = require('./theia.js');
const Key = require('./key.js');
const Axis = require('./axis.js');

/**
* Create AxisChart from the supplied data, based on the supplied JSON config.
*
* @class AxisChart
* @extends Theia
* @constructor
*/
export default class AxisChart extends Theia {
  oChartG;
  oAxisG;
  oAxis;
  oKey;

  /**
  * Constructor function supersedes parent class.
  *
  * @method constructor
  * @param {Object} oParams same as Theia
  */
  constructor(oParams = {}) {
    super(oParams);
    this.jPadding = { l: 35, r: 15, t: 25, b: 90 };
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
      .domain(this.aData.map(d => d[this.jConfig.aAxisKeys[0]]))
      .range([0, this.iInnerWidth]);
    this.oScaleY
      .domain([0, d3.max(this.aData, (d) => {
        const aValues = [];
        this.jConfig.aValues.forEach((oValue) => {
          aValues.push(parseInt(d[oValue.sKey]));
        });
        return d3.max(aValues);
      })])
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
    this.oAxisG = this.oAxisG || this.oD3Svg.append('g').attr('class', 'axes-g');
    this.oAxis = new Axis({
      oContainer: this.oAxisG,
      iTruncate,
      aAxisLabels,
      oScaleX,
      oScaleY,
      jPadding,
      iWidth: iInnerWidth,
      iHeight: iInnerHeight,
      oToolTip: this.oToolTip }).render();

    // Add chart container group
    this.oChartG = this.oChartG || this.oD3Svg.append('g').attr('transform', `translate(${this.jPadding.l}, 0)`);

    // Render the key for the data
    this.oKey = new Key({
      oContainer: d3.select(this.oSvg),
      aValues: this.jConfig.aValues,
      iOffsetX: (this.iInnerWidth / 2) + this.jPadding.l,
      iOffsetY: this.iHeight - 15
    }).render();
  }

}

module.exports = AxisChart;
