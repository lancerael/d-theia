import BarChart from './components/bar-chart';
import LineChart from './components/line-chart';
import BubbleChart from './components/bubble-chart';
import Utilities from './components/utilities';

/**
* Theia is the main API for dTheia - a reusable charting library built using d3 v.4 and ES6
*
* @module Theia
*/

const Theia = {

  /**
  * Create a chart and return object
  *
  * @method chart
  * @param {String} sContainer ID to select container DOM object
  * @param {String} sType string denoting the type of chart
  * @param {Object} jParams includes target DOM object, JSON config and array of data
  * @return {Chart object} oChart returns a chart object of the requested type
  */
  chart(sContainer, sType, jParams) {
    let oChart = {};
    const oAllParams = { sContainer, sType, ...jParams };
    switch (sType) {
      case 'line': {
        oChart = this.createLineChart(oAllParams);
        break;
      }
      case 'bubble': {
        oChart = this.createBubbleChart(oAllParams);
        break;
      }
      default: {
        oChart = this.createBarChart(oAllParams);
      }
    }
    return oChart;
  },

  /**
  * Create a bar chart and return object
  *
  * @method createBarChart
  * @param {Object} oParams contains the configuration for the chart
  * @return {BarChart object} returns a bar chart object
  */
  createBarChart(oParams) {
    return new BarChart(oParams).init();
  },

  /**
  * Create a line chart and return object
  *
  * @method createLineChart
  * @param {Object} oParams contains the configuration for the chart
  * @return {LineChart object} returns a line chart object
  */
  createLineChart(oParams) {
    return new LineChart(oParams).init();
  },

  /**
  * Create a line chart and return object
  *
  * @method createBubbleChart
  * @param {Object} oParams contains the configuration for the chart
  * @return {BubbleChart object} returns a bubble chart object
  */
  createBubbleChart(oParams) {
    return new BubbleChart(oParams).init();
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
