import * as d3 from 'd3';
import AxisChart from './axis-chart';

/**
* Create LineCharts from the supplied data, based on the JSON config.
*
* @class LineChart
* @extends AxisChart
* @constructor
*/
export default class LineChart extends AxisChart {
  aLines;
  aCircles;

  /**
  * Constructor used to set chart type
  *
  * @method constructor
  */
  constructor(oParams = {}) {
    super(oParams);
    this.sChartType = 'line';
    this.oScaleX = d3.scalePoint();
  }

  /**
  * Render the chart including lines, axes and labels
  *
  * @method renderChart
  */
  renderChart() {
    super.renderChart();
    const { aValues } = this.jConfig;
    const { oScaleX, oScaleY } = this;

    this.aLines = this.aLines || [];
    this.aCircles = this.aCircles || [];

    // Iterate through config value keys
    aValues.forEach((oValues, i) => {
      const { sColour } = oValues;

      if (!this.aLines[i]) {
        // define the line
        this.aLines[i] = d3.line();

        // Add the valueline path.
        this.d3ChartGroup.append('path')
            .data([this.aData])
            .attr('class', `line lines-${i}`)
            .attr('stroke', sColour);
      }

      // Update lines
      this.aLines[i]
        .x(d => oScaleX(d.sLabel) + (oScaleX.bandwidth() / 2))
        .y(d => oScaleY(d.aValues[i]));
      this.d3ChartGroup.selectAll(`path.lines-${i}`)
        .data([this.aData])
        .attr('d', this.aLines[i]);

      // Add circles for each value
      if (!this.aCircles[i]) {
        // Bind circles data
        this.aCircles[i] = this.d3ChartGroup.selectAll(`circle.circles-${i}`).data(this.aData);
        // Add new circle elements and set base attributes
        this.aCircles[i]
          .enter()
          .append('circle')
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
          .attr('class', `circles circles-${i}`)
          .attr('fill', sColour)
          .attr('r', 5);
      }

      // Update circles
      this.d3ChartGroup.selectAll(`circle.circles-${i}`)
        .data(this.aData)
        .attr('cy', d => oScaleY(d.aValues[i]))
        .attr('cx', d => oScaleX(d.sLabel) + (oScaleX.bandwidth() / 2));
    });
  }

}

module.exports = LineChart;
