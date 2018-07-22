import { easeLinear } from 'd3-ease';
import { select, event } from 'd3-selection';
import 'd3-transition';
import AxisChart from './AxisChart';

/**
* Create BarCharts from the supplied data, based on the JSON config.
*
* @class BarChart
* @extends {AxisChart}
* @constructor
*/
export default class BarChart extends AxisChart {

  /**
  * The local collection of bars
  *
  * @property aBars
  * @type {Array}
  */
  aBars;

  /**
  * Constructor used to set chart type
  *
  * @method constructor
  */
  constructor(oParams = {}) {
    super(oParams);
    this.sChartType = 'bar';
  }

  /**
  * Render the chart including bars, axes and labels
  *
  * @method renderChart
  * @param {Boolean} bReset optionally reset the chart data
  * @param {Boolean} bHeightTransition optionally transition height
  */
  renderChart(bReset = false, bHeightTransition = true) {
    super.renderChart();
    const { aValues, sBarType = 'side' } = this.jConfig;
    const { iInnerHeight, oScaleX, oScaleY } = this;
    const iBarWidth = oScaleX.bandwidth() / aValues.length;

    this.aBars = this.aBars || [];

    // Reset bars data and clear graph
    if (bReset) {
      this.aBars.forEach((dtBar, i) => {
        this.aBars[i] = this.d3ChartGroup.selectAll(`rect.bars-${i}`).data({});
        this.aBars[i].exit().remove();
        this.aBars[i] = undefined;
      });
      this.aBars = [];
    }

    // Iterate through config value keys
    aValues.forEach((oValues, i) => {
      const { oColor } = oValues;
      const iBarOffset = sBarType === 'side' ? (iBarWidth * i) : 0;
      // Add bars for each value
      if (!this.aBars[i]) {
        // Bind bars data
        this.aBars[i] = this.d3ChartGroup.selectAll(`rect.bars-${i}`).data(this.aData);
        // Add new rect elements and set base attributes
        this.aBars[i]
          .enter()
          .append('rect')
          .on('mousemove', (d) => {
            this.oTooltip.ping([d.sLabel, oValues.sName, d.aValues[i]]);
          })
          .on('mouseover', (d) => {
            d.oColor = oColor;
            select(event.target).attr('fill', d.oColor.darker(1));
          })
          .on('mousedown', (d) => {
            if (this.jConfig.fnClickCallback) {
              this.jConfig.fnClickCallback({
                oEvent: event,
                jData: d
              });
            }
          })
          .on('mouseout', (d) => {
            this.oTooltip.hide();
            select(event.target).attr('fill', d.oColor);
          })
          .attr('class', `bars bars-${i}`)
          .attr('fill', oColor)
          .attr('y', iInnerHeight)
          .attr('height', 0);
      }

      // Update bars (IIFE used to allow for optional transition)
      (() => {
        const d3BarGroup = this.d3ChartGroup.selectAll(`rect.bars-${i}`);
        d3BarGroup.data(this.aData)
          .attr('x', d => oScaleX(d.sLabel) + iBarOffset)
          .attr('width', iBarWidth);
        if (bHeightTransition) {
          return d3BarGroup.transition(false)
          .ease(easeLinear)
          .duration(this.iTransitionTime);
        }
        return d3BarGroup;
      })().attr('y', (d) => {
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
