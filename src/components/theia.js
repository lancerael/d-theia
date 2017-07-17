const BarChart = require('./bar-chart.js');
const LineChart = require('./line-chart.js');
const BubbleChart = require('./bubble-chart.js');

/**
* Theia is the main API for dTheia - a reusable charting library built using d3 v.4 and ES6
*
* @module Theia
*/

const Theia = {
  aCharts: [],
  aBarCharts: [],
  aLineCharts: [],
  aBubbleCharts: [],

  createBarChart(jParams) {
    const oBarChart = new BarChart(jParams).init();
    this.aCharts.push(oBarChart);
    this.aBarCharts.push(oBarChart);
    return oBarChart;
  },

  createLineChart(jParams) {
    const oLineChart = new LineChart(jParams).init();
    this.aCharts.push(oLineChart);
    this.aBarCharts.push(oLineChart);
    return oLineChart;
  },

  createBubbleChart(jParams) {
    const oBubbleChart = new BubbleChart(jParams).init();
    this.aCharts.push(oBubbleChart);
    this.aBarCharts.push(oBubbleChart);
    return oBubbleChart;
  }
};

module.exports = Theia;
