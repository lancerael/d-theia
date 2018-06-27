import * as d3 from 'd3';
import AxisChart from './axis-chart';

/**
* Create BarCharts from the supplied data, based on the JSON config.
*
* @class BarChart
* @extends AxisChart
* @constructor
*/
export default class BarChart extends AxisChart {
  aBars;

  /**
  * Constructor used to set chart type
  *
  * @method constructor
  */
  constructor(oParams = {}) {
    super(oParams);
    this.sChartType = 'bar';
    this.oScaleX = d3.scaleBand().padding(0.2);
  }

  /**
  * Render the chart including bars, axes and labels
  *
  * @method renderChart
  * @param {Boolean} bReset optionally reset the chart data
  */
  renderChart(bReset) {
    super.renderChart();
    const { aValues, sBarType = 'side' } = this.jConfig;
    const { iInnerHeight, oScaleX, oScaleY } = this;
    const iBarWidth = oScaleX.bandwidth() / aValues.length;

    // Iterate through config value keys
    aValues.forEach((oValues, i) => {
      const { sColour } = oValues;
      const iBarOffset = sBarType === 'side' ? (iBarWidth * i) : 0;
      // Reset bars data and clear graph
      if (bReset) {
        this.aBars[i] = this.d3ChartGroup.selectAll('rect.bars').data({});
        this.aBars[i].exit().remove();
        this.aBars[i] = undefined;
      }
      this.aBars = this.aBars || [];
      // Add bars for each value
      if (!this.aBars[i]) {
        // Bind bars data
        this.aBars[i] = this.d3ChartGroup.selectAll(`rect.bars-${i}`).data(this.aData);
        // Add new rect elements and set base attributes
        this.aBars[i]
          .enter()
          .append('rect')
          .on('mousemove', (d) => {
            this.oToolTip.ping([d.sLabel, oValues.sName, d.aValues[i]]);
          })
          .on('mouseover', (d) => {
            d.oColour = this.jConfig.aValues[i].oColour;
            d3.select(d3.event.target).attr('fill', d.oColour.darker(1));
          })
          .on('mousedown', (d) => {
            if (this.jConfig.fnClickCallback) {
              this.jConfig.fnClickCallback({
                oEvent: d3.event,
                jData: d
              });
            }
          })
          .on('mouseout', (d) => {
            this.oToolTip.hide();
            d3.select(d3.event.target).attr('fill', d.oColour);
          })
          .attr('class', `bars bars-${i}`)
          .attr('fill', sColour)
          .attr('y', iInnerHeight)
          .attr('height', 0);
      }

      // Update bars
      this.d3ChartGroup.selectAll(`rect.bars-${i}`)
        .attr('x', d => oScaleX(d.sLabel) + iBarOffset)
        .attr('width', iBarWidth)
        .transition()
        .ease(d3.easeLinear)
        .duration(this.iTransitionTime)
        .attr('y', (d) => {
          let iValue = d.aValues[i];
          iValue = iValue < 0 ? Math.abs(iValue) : 0;
          return oScaleY(d.aValues[i] + iValue);
        })
        .attr('height', (d) => {
          const iModifier = this.iMinValue < 0 ? Math.abs(this.iMinValue) : 0;
          return iInnerHeight - oScaleY(Math.abs(d.aValues[i]) - iModifier);
        });
    });
  }

}

module.exports = BarChart;
