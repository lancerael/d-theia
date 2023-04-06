/** @license dTheia v2.3.2
 *
 * Copyright (c) 2017-present, Lance Taylor.
 *
 * This source code is licensed under the GNU public license found in the
 * LICENSE file in the root directory of this source tree.
 */

import BarChart from './components/BarChart'
import LineChart from './components/LineChart'
import BubbleChart from './components/BubbleChart'
import Utilities from './components/Utilities'
import DataOps from './components/DataOps'

/**
 * Theia is the main API for dTheia - a reusable charting library built using d3 v.4 and ES6
 *
 * @module dTheia
 * @class Theia
 * @static
 * @main
 */

export default class Theia {
  /**
   * Create a chart and return object
   *
   * @method chart
   * @static
   * @param {String} sContainer ID to select container DOM object
   * @param {String} sType string denoting the type of chart
   * @param {Object} oParams includes target DOM object, JSON config and array of data
   * @return {Object} oChart returns a chart object of the requested type
   */
  static chart(
    sContainer: any,
    sType: 'line' | 'bubble' | 'bar' = 'bar',
    oParams: any
  ) {
    const oAllParams = { sContainer, ...oParams }
    return {
      line: () => this.createLineChart(oAllParams),
      bubble: () => this.createBubbleChart(oAllParams),
      bar: () => this.createBarChart(oAllParams),
    }[sType]()
  }

  /**
   * Create a bar chart and return object
   *
   * @method createBarChart
   * @static
   * @param {Object} oParams contains the configuration for the chart
   * @return {Object} returns a bar chart object
   */
  static createBarChart(oParams: any) {
    return new BarChart(oParams).init()
  }

  /**
   * Create a line chart and return object
   *
   * @method createLineChart
   * @static
   * @param {Object} oParams contains the configuration for the chart
   * @return {Object} returns a line chart object
   */
  static createLineChart(oParams: any) {
    return new LineChart(oParams).init()
  }

  /**
   * Create a line chart and return object
   *
   * @method createBubbleChart
   * @static
   * @param {Object} oParams contains the configuration for the chart
   * @return {Object} returns a bubble chart object
   */
  static createBubbleChart(oParams: any) {
    return new BubbleChart(oParams).init()
  }

  /**
   * Return a public Utilities module
   *
   * @method getUtilities
   * @static
   */
  static getUtilities() {
    return Utilities
  }

  /**
   * Return a public DataOps module
   *
   * @method getDataOps
   * @static
   */
  static getDataOps() {
    return DataOps
  }
}
