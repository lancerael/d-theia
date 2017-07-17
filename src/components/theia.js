const BarChart = require('./bar-chart.js');
const LineChart = require('./line-chart.js');
const BubbleChart = require('./bubble-chart.js');
const Utilities = require('./utilities.js');

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

  /**
  * Create a bar chart and return object
  *
  * @method createBarChart
  * @param {Object} oParams includes target DOM object, JSON config and array of data
  */
  createBarChart(oParams) {
    const oBarChart = new BarChart(oParams).init();
    this.aCharts.push(oBarChart);
    this.aBarCharts.push(oBarChart);
    return oBarChart;
  },

  /**
  * Create a line chart and return object
  *
  * @method createLineChart
  * @param {Object} oParams includes target DOM object, JSON config and array of data
  */
  createLineChart(jParams) {
    const oLineChart = new LineChart(jParams).init();
    this.aCharts.push(oLineChart);
    this.aBarCharts.push(oLineChart);
    return oLineChart;
  },

  /**
  * Create a line chart and return object
  *
  * @method createLineChart
  * @param {Object} oParams includes target DOM object, JSON config and array of data
  */
  createBubbleChart(jParams) {
    const oBubbleChart = new BubbleChart(jParams).init();
    this.aCharts.push(oBubbleChart);
    this.aBarCharts.push(oBubbleChart);
    return oBubbleChart;
  },

  /**
  * Return a public Utilities module
  *
  * @method getUtilities
  */
  getUtilities() {
    return Utilities;
  }
};

module.exports = Theia;
