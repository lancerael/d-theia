/**
* dTheia is a reusable charting library built using d3 v.4 and ES6
*
* @module dTheia
*/

const d3 = require('d3');
const ToolTip = require('./tooltip.js');

/**
* The Theia object is the parent class for all types of Chart.
*
* @class Theia
* @constructor
*/
export default class Theia {
  oSvg;
  oD3Svg;
  iTransitionTime;
  oContainer;
  oToolTip;
  iWidth;
  iHeight;
  iInnerWidth;
  iInnerHeight;
  iInitialWidth;
  iResizeOffset;
  jConfig;
  jPadding;
  aData;

  /**
  * Constructor function that sets up the local object.
  *
  * @method constructor
  * @param {Object} oParams (may contain any of the below values)
  * @param {DOM Element} oContainer Optional DOM object
  * @param {JSON Object} jConfig JSON configuration object
  * @param {Array} aData the data to be displayed
  */
  constructor(oParams = {}) {
    const { oContainer, jConfig, aData } = oParams;
    this.oSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.oD3Svg = d3.select(this.oSvg);
    this.iTransitionTime = 500;
    this.jPadding = { l: 5, r: 5, t: 5, b: 5 };
    if (oContainer) {
      this.setContainer(oContainer);
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
  * @param {DOM Element} oContainer Required DOM element
  * @throws {Error} invalid DOM element
  */
  setContainer(oContainer) {
    if (oContainer.nodeName) {
      this.oContainer = oContainer;
    } else {
      throw new Error('No valid DOM element provided for chart.');
    }
  }

  /**
  * Sets the local config options for the chart.
  *
  * @method setConfig
  * @param {JSON Object} jConfig JSON configuration object
  * @throws {Error} missing configuration
  */
  setConfig(jConfig) {
    if (jConfig && jConfig.toString() === '[object Object]') {
      this.jConfig = Object.assign({}, jConfig);
    } else {
      throw new Error('No valid configuration provided for chart.');
    }
  }

  /**
  * Sets the local data for the chart.
  *
  * @method setData
  * @param {Array} aData array of JSON objects
  * @throws {Error} missing data
  */
  setData(aData) {
    if (aData && Array.isArray(aData) === true) {
      this.aData = aData.slice(aData);
    } else {
      throw new Error('No valid data provided for chart.');
    }
  }

  /**
  * Sets the local chart dimensions based on the size of the container.
  *
  * @method setDimensions
  * @throws {Error} missing DOM element
  */
  setDimensions() {
    if (this.oContainer && this.oContainer.nodeName) {
      this.iWidth = this.oContainer.clientWidth;
      this.iHeight = this.oContainer.clientHeight;
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
  */
  init() {
    this.setDimensions();
    if (this.aData && this.jConfig && !isNaN(this.iWidth) && !isNaN(this.iHeight)) {
      this.iInitialWidth = this.iWidth;
      this.oToolTip = new ToolTip(this.oContainer).create();
      d3.select(this.oContainer).append('div').attr('class', 'title').text(this.jConfig.sTitle);
      this.oSvg.setAttribute('class', 'theia');
      this.oContainer.appendChild(this.oSvg);
      this.oResizeWatcher = this.oResizeWatcher || window.addEventListener('resize', () => {
        this.setDimensions();
        this.iResizeOffset = this.iWidth - this.iInitialWidth;
        if (this.renderChart) {
          this.renderChart();
        }
        this.oToolTip.hide();
      });
      this.oChartOutWatcher = this.oChartOutWatcher || this.oSvg.addEventListener('mouseout', () => {
        this.oToolTip.hide();
      });
      if (this.renderChart) {
        this.renderChart();
      }
    } else {
      throw new Error('The chart is not ready for initialisation.');
    }
  }

}

module.exports = Theia;
