const d3 = require('d3');
const AxisChart = require('./axis-chart.js');

/**
* Create LineCharts from the supplied data, based on the supplied JSON config.
*
* @class LineChart
* @extends AxisChart
* @constructor
*/
export default class LineChart extends AxisChart {
  aLines;

  /**
  * Render the chart including lines, axes and labels
  *
  * @method renderChart
  */
  renderChart() {
    super.renderChart();
    const { aAxisKeys, aValues } = this.jConfig;
    const { oScaleX, oScaleY } = this;

    this.aLines = this.aLines || [];
    this.oChartG.selectAll('path.line').remove();

    // Iterate through config value keys
    aValues.forEach((oValues, i) => {
      const { sKey, sColour } = oValues;

      // define the line
      this.aLines[i] = d3.line()
        .x(d => oScaleX(d[aAxisKeys[0]]) + (oScaleX.bandwidth() / 2))
        .y(d => oScaleY(d[sKey]));

        // Add the valueline path.
      this.oChartG.append('path')
          .data([this.aData])
          .attr('class', 'line')
          .attr('stroke', sColour)
          .attr('d', this.aLines[i]);
    });
  }

}

module.exports = LineChart;
