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
  aCircles;

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

      this.aCircles = this.aCircles || [];
      // Add circles for each value
      if (!this.aCircles[i]) {
        // Bind circles data
        this.aCircles[i] = this.oChartG.selectAll(`circle.circles-${i}`).data(this.aData);
        // Add new circle elements and set base attributes
        this.aCircles[i]
          .enter()
          .append('circle')
          .on('mousemove', (d) => {
            this.oToolTip.ping(d3.event.clientX, d3.event.clientY + 20,
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
          .attr('class', `circles circles-${i}`)
          .attr('fill', sColour)
          .attr('r', 3)
          .attr('cx', d => oScaleX(d[aAxisKeys[0]]) + (oScaleX.bandwidth() / 2))
          .attr('cy', d => oScaleY(d[sKey]));
      }
    });
  }

}

module.exports = LineChart;
