import { select } from 'd3-selection';
import Tooltip from './Tooltip';
import DataOps from './DataOps';

/**
* The Chart object is the parent class for all types of Chart.
* It is used to initialise all of the base settings universal to all charts.
*
* @class Chart
* @constructor
*/
export default class Chart {

  /**
  * SVG DOM object for displaying the chart
  *
  * @property dSvg
  * @type {Object}
  */
  dSvg;

  /**
  * SVG d3 object for d3 operations on the chart
  *
  * @property d3Svg
  * @type {Object}
  */
  d3Svg;

  /**
  * Default time for d3 transitions on the chart
  *
  * @property iTransitionTime
  * @type {Number}
  */
  iTransitionTime;

  /**
  * DOM reference to container element that wraps SVG
  *
  * @property dContainer
  * @type {Object}
  */
  dContainer;

  /**
  * DOM reference to loader display element
  *
  * @property dLoader
  * @type {Object}
  */
  dLoader;

  /**
  * Chart's tooltip object
  *
  * @property oTooltip
  * @type {Object}
  */
  oTooltip;

  /**
  * The current calculated width of the chart
  *
  * @property iWidth
  * @type {Number}
  */
  iWidth;

  /**
  * The current calculated height of the chart
  *
  * @property iHeight
  * @type {Number}
  */
  iHeight;

  /**
  * The current calculated inner width of the chart
  *
  * @property iInnerWidth
  * @type {Number}
  */
  iInnerWidth;

  /**
  * The current calculated inner height of the chart
  *
  * @property iInnerHeight
  * @type {Number}
  */
  iInnerHeight;

  /**
  * The width before any browser resize
  *
  * @property iInitialWidth
  * @type {Number}
  */
  iInitialWidth;

  /**
  * The padding for the chart within the container
  *
  * @property jPadding
  * @type {Object}
  */
  jPadding;

  /**
  * The chart's config object
  *
  * @property jConfig
  * @type {Object}
  */
  jConfig;

  /**
  * The chart's data
  *
  * @property aData
  * @type {Array}
  */
  aData;

  /**
  * Constructor function that sets up the local object.
  *
  * @method constructor
  * @param {Object} jConfig JSON configuration object
  * @param {Array} aData the data to be displayed
  * @param {String} sContainer Optional ID to select DOM object
  * @param {Object} dContainer Optional DOM object in place of ID
  */
  constructor(oParams = {}) {
    const { jConfig, aData, sContainer } = oParams;
    let { dContainer } = oParams;
    this.dSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.d3Svg = select(this.dSvg);
    this.iTransitionTime = 500;
    this.jPadding = { l: 5, r: 5, t: 5, b: 5 };
    this.dLoader = document.createElement('div');
    this.dLoader.className = 'dt-loader';
    if (!dContainer && sContainer) {
      dContainer = document.getElementById(sContainer);
    }
    if (dContainer) {
      this.setContainer(dContainer);
    }
    if (jConfig) {
      this.setConfig(jConfig);
    }
    if (aData) {
      this.setData(aData);
    }
  }

  /**
  * Sets the local container object.
  *
  * @method setContainer
  * @param {Object} dContainer Required DOM element
  * @throws {Error} invalid DOM element
  */
  setContainer(dContainer) {
    if (dContainer.nodeName) {
      dContainer.appendChild(this.dLoader);
      this.dContainer = dContainer;
    } else {
      throw new Error('No valid DOM element or ID provided for chart.');
    }
  }

  /**
  * Sets the local config options for the chart.
  *
  * @method setConfig
  * @param {Object} jConfig JSON configuration object
  * @throws {Error} missing configuration
  */
  setConfig(jConfig) {
    if (jConfig && jConfig.toString() === '[object Object]') {
      if (jConfig.aValues) {
        jConfig.aValues = DataOps.addColoursToConfig(jConfig.aValues);
      }
      this.jConfig = jConfig;
    } else {
      throw new Error('No valid configuration provided for chart.');
    }
  }

  /**
  * Sets the local data for the chart.
  *
  * @method setData
  * @param {Array} aData array of JSON objects
  * @param {Boolean} bTransform transform mapped data
  * @throws {Error} missing data
  */
  setData(aData, bTransform = true) {
    if (aData && Array.isArray(aData) === true) {
      if (this.jConfig && bTransform) {
        aData = DataOps.transformDataKeys(this.jConfig, aData);
      }
      this.aData = aData;
    } else {
      throw new Error('No valid data provided for chart.');
    }
  }

  /**
  * Updates the local data for the chart.
  *
  * @method updateData
  * @param {Array} aData array of JSON objects
  * @param {Boolean} bTransform transform mapped data
  */
  updateData(aData, bTransform = true) {
    this.setData(aData, bTransform);
    this.setDimensions();
    if (this.oAxis) {
      this.oAxis.render();
    }
    if (this.renderChart) {
      this.renderChart();
    }
  }

  /**
  * Updates the local config for the chart.
  *
  * @method updateConfig
  * @param {JSON} jConfig config JSON style object
  */
  updateConfig(jConfig) {
    this.setConfig(jConfig);
    if (this.renderChart) {
      this.renderChart(true, false);
    }
  }

  /**
  * Sets the local chart dimensions based on the size of the container.
  *
  * @method setDimensions
  * @throws {Error} missing DOM element
  */
  setDimensions() {
    if (this.dContainer && this.dContainer.nodeName) {
      this.iWidth = this.dContainer.clientWidth;
      this.iHeight = this.dContainer.clientHeight;
      this.iInnerWidth = this.iWidth - this.jPadding.l - this.jPadding.r;
      this.iInnerHeight = this.iHeight - this.jPadding.t - this.jPadding.b;
    } else {
      throw new Error('Cannot set dimensions of chart without container element.');
    }
  }

  /**
  * Check chart is ready and render.
  *
  * @method init
  * @throws {Error} chart not ready for initialisation
  * @chainable
  */
  init() {
    this.setDimensions();
    if (this.aData && this.jConfig && !isNaN(this.iWidth) && !isNaN(this.iHeight)) {
      this.iInitialWidth = this.iWidth;
      this.oTooltip = new Tooltip(this.dContainer).create();
      select(this.dContainer).append('div').attr('class', 'title').text(this.jConfig.sTitle);
      this.dSvg.setAttribute('class', 'chart');
      this.dContainer.appendChild(this.dSvg);
      this.oResizeWatcher = this.oResizeWatcher || window.addEventListener('resize', () => {
        this.setDimensions();
        this.iResizeOffset = this.iWidth - this.iInitialWidth;
        if (this.renderChart) {
          this.renderChart();
        }
        this.oTooltip.hide();
      });
      this.oChartOutWatcher = this.oChartOutWatcher || this.dSvg.addEventListener('mouseout', () => {
        this.oTooltip.hide();
      });
      if (this.renderChart) {
        this.renderChart();
      }
      this.dContainer.removeChild(this.dLoader);
      return this;
    }
    throw new Error('The chart is not ready for initialisation.');
  }

}

module.exports = Chart;
