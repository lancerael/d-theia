import * as d3 from 'd3';
import ToolTip from './tooltip';
import Colors from './colors';

/**
* The Chart object is the parent class for all types of Chart.
*
* @class Chart
* @constructor
*/
export default class Chart {
  dSvg;
  d3Svg;
  iTransitionTime;
  dContainer;
  dLoader;
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
  * @param {JSON Object} jConfig JSON configuration object
  * @param {Array} aData the data to be displayed
  * @param {String} sContainer Optional ID to select DOM object
  * @param {DOM Element} dContainer Optional DOM object in place of ID
  */
  constructor({ jConfig, aData, sContainer, dContainer }) {
    this.dSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.d3Svg = d3.select(this.dSvg);
    this.iTransitionTime = 500;
    this.jPadding = { l: 5, r: 5, t: 5, b: 5 };
    this.dLoader = document.createElement('div');
    this.dLoader.className = 'dt-loader';
    if (!dContainer && sContainer) {
      dContainer = document.getElementById(sContainer);
      if (!dContainer || !dContainer.nodeName) {
        throw new Error('No valid element or ID provided for chart.');
      }
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
  * @param {DOM Element} dContainer Required DOM element
  * @throws {Error} invalid DOM element
  */
  setContainer(dContainer) {
    if (dContainer.nodeName) {
      dContainer.appendChild(this.dLoader);
      this.dContainer = dContainer;
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
      this.jConfig = { ...jConfig };
      if (this.aData) {
        this.transformDataKeys();
      }
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
      this.aData = [...aData];
      if (this.jConfig && bTransform) {
        this.transformDataKeys();
      }
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
  updateData(aData, bTransform = false) {
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
  * Maps custom data keys into standard structure.
  *
  * @method transformDataKeys
  */
  transformDataKeys() {
    if (this.jConfig.aValues || this.jConfig.aAxisKeys) {
      this.aData.map((hItem) => {
        if (this.jConfig.aValues && !hItem.aValues) {
          hItem.aValues = [];
          this.jConfig.aValues.forEach((jValue) => {
            hItem.aValues.push(parseInt(hItem[jValue.sKey]));
          });
        }
        if (this.jConfig.aAxisKeys && !hItem.sLabel) {
          hItem.sLabel = hItem[this.jConfig.aAxisKeys[0]];
        }
        return hItem;
      });
      this.jConfig.aValues.map((jValue) => {
        if (!jValue.sColour) {
          jValue.sColour = Colors.getRandomColor();
        }
        jValue.oColour = d3.rgb(jValue.sColour);
        return jValue;
      });
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
      this.oToolTip = new ToolTip(this.dContainer).create();
      d3.select(this.dContainer).append('div').attr('class', 'title').text(this.jConfig.sTitle);
      this.dSvg.setAttribute('class', 'chart');
      this.dContainer.appendChild(this.dSvg);
      this.oResizeWatcher = this.oResizeWatcher || window.addEventListener('resize', () => {
        this.setDimensions();
        this.iResizeOffset = this.iWidth - this.iInitialWidth;
        if (this.renderChart) {
          this.renderChart();
        }
        this.oToolTip.hide();
      });
      this.oChartOutWatcher = this.oChartOutWatcher || this.dSvg.addEventListener('mouseout', () => {
        this.oToolTip.hide();
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
