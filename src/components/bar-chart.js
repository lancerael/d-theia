const d3 = require('d3');
const Theia = require('./theia.js');
const Key = require('./key.js');
const Axis = require('./axis.js');

/**
* Create BarCharts from the supplied data, based on the supplied JSON config.
*
* @class BarChart
* @extends Theia
* @constructor
*/
export default class BarChart extends Theia {
  aBars;
  oBarsG;
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
  * Render the chart including bars, axes and labels
  *
  * @method renderChart
  * @param {Boolean} bReset optionally reset the chart data
  */
  renderChart(bReset) {
    const { aAxisKeys, aAxisLabels, aValues, sBarType, iTruncate } = this.jConfig;
    const { iInnerWidth, iInnerHeight, oScaleX, oScaleY, jPadding } = this;
    const iBarWidth = oScaleX.bandwidth() / aValues.length;

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
    // Add bars container group
    this.oBarsG = this.oBarsG || this.oD3Svg.append('g').attr('transform', `translate(${this.jPadding.l}, 0)`);
    // Iterate through config value keys
    aValues.forEach((oValues, i) => {
      const { sKey, sColour } = oValues;
      const iBarOffset = sBarType === 'side' ? (iBarWidth * i) : 0;
      // Reset bars data and clear graph
      if (bReset) {
        this.aBars[i] = this.oBarsG.selectAll('rect.bars').data({});
        this.aBars[i].exit().remove();
        this.aBars[i] = undefined;
      }
      this.aBars = this.aBars || [];
      // Add bars for each value
      if (!this.aBars[i]) {
        // Bind bars data
        this.aBars[i] = this.oBarsG.selectAll(`rect.bars-${i}`).data(this.aData);
        // Add new rect elements and set base attributes
        this.aBars[i]
          .enter()
          .append('rect')
          .on('mousemove', (d) => {
            this.oToolTip.ping(d3.event.clientX, d3.event.clientY + document.body.scrollTop + 20,
              `<strong>${d[aAxisKeys[0]]}</strong><br>${oValues.sName}: <em>${d[oValues.sKey]}</em>`);
          })
          .on('mousedown', (d) => {
            if (this.jConfig.fnClickCallback) {
              this.jConfig.fnClickCallback({
                oEvent: d3.event,
                jData: d,
                sKey
              });
            }
          })
          .on('mouseout', () => this.oToolTip.hide())
          .attr('class', `bars bars-${i}`)
          .attr('fill', sColour)
          .attr('y', iInnerHeight)
          .attr('height', 0);
      }

      // Update bars
      this.oBarsG.selectAll(`rect.bars-${i}`)
        .attr('x', d => oScaleX(d[aAxisKeys[0]]) + iBarOffset)
        .attr('width', iBarWidth)
        .transition()
        .ease(d3.easeLinear)
        .duration(this.iTransitionTime)
        .attr('y', d => oScaleY(d[sKey]))
        .attr('height', d => iInnerHeight - oScaleY(d[sKey]));

      // Render the key for the data
      this.oKey = new Key({
        oContainer: d3.select(this.oSvg),
        aValues: this.jConfig.aValues,
        iOffsetX: (this.iInnerWidth / 2) + this.jPadding.l,
        iOffsetY: this.iHeight - 15
      }).render();
    });
  }

}

module.exports = BarChart;
