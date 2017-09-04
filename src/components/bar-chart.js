const d3 = require('d3');
const AxisChart = require('./axis-chart.js');

/**
* Create BarCharts from the supplied data, based on the supplied JSON config.
*
* @class BarChart
* @extends AxisChart
* @constructor
*/
export default class BarChart extends AxisChart {
  aBars;

  /**
  * Render the chart including bars, axes and labels
  *
  * @method renderChart
  * @param {Boolean} bReset optionally reset the chart data
  */
  renderChart(bReset) {
    super.renderChart();
    const { aAxisKeys, aValues, sBarType } = this.jConfig;
    const { iInnerHeight, oScaleX, oScaleY } = this;
    const iBarWidth = oScaleX.bandwidth() / aValues.length;

    // Iterate through config value keys
    aValues.forEach((oValues, i) => {
      const { sKey, sColour } = oValues;
      const iBarOffset = sBarType === 'side' ? (iBarWidth * i) : 0;
      // Reset bars data and clear graph
      if (bReset) {
        this.aBars[i] = this.oChartG.selectAll('rect.bars').data({});
        this.aBars[i].exit().remove();
        this.aBars[i] = undefined;
      }
      this.aBars = this.aBars || [];
      // Add bars for each value
      if (!this.aBars[i]) {
        // Bind bars data
        this.aBars[i] = this.oChartG.selectAll(`rect.bars-${i}`).data(this.aData);
        // Add new rect elements and set base attributes
        this.aBars[i]
          .enter()
          .append('rect')
          .on('mousemove', (d) => {
            this.oToolTip.ping(d3.event.clientX, d3.event.clientY + 25,
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
      this.oChartG.selectAll(`rect.bars-${i}`)
        .attr('x', d => oScaleX(d[aAxisKeys[0]]) + iBarOffset)
        .attr('width', iBarWidth)
        .transition()
        .ease(d3.easeLinear)
        .duration(this.iTransitionTime)
        .attr('y', d => oScaleY(d[sKey]))
        .attr('height', d => iInnerHeight - oScaleY(d[sKey]));
    });
  }

}

module.exports = BarChart;
