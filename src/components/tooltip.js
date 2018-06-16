import { event } from 'd3';

/**
* The Tooltip
*
* @class Tooltip
* @constructor
*/
export default class Tooltip {
  oContainer;
  oTooltip;
  oTooltipTimeout;
  oTooltipSubTimeout;

  /**
  * Constructor function that sets up the local object.
  *
  * @method constructor
  * @param {DOM Element} oContainer DOM object
  */
  constructor(oContainer) {
    if (oContainer.nodeName) {
      this.oContainer = oContainer;
    } else {
      throw new Error('The tooltip has no valid container element.');
    }
  }

  /**
  * Create the tooltip DOM and return object
  *
  * @method create
  * @chainable
  */
  create() {
    this.oTooltip = document.createElement('div');
    this.oTooltip.className = 'tooltip is-transparent is-hidden';
    this.oContainer.appendChild(this.oTooltip);
    return this;
  }

  /**
  * Ping the tooltip with data and location
  *
  * @method ping
  * @param {Integer} x Location of x tooltip position
  * @param {Integer} y Location of y tooltip position
  * @param {String} sContent inner html content
  */
  ping(mContent) {
    const sContent = mContent.constructor === Array
      ? `<strong>${mContent[0]}</strong><br>${mContent[1]}: <em>${mContent[2]}</em>`
      : mContent;
    const iZoomDivider = 1 + (window.devicePixelRatio > 1 ? (window.devicePixelRatio / 20) : 0);
    const oContainerEdges = this.oContainer.getBoundingClientRect()
    const iPageOffsetX = oContainerEdges.left - 15;
    const iPageOffsetY = oContainerEdges.top;
    this.oTooltip.innerHTML = sContent;
    this.oTooltip.className = 'tooltip is-transparent';
    this.oTooltip.className = 'tooltip';
    this.oTooltip.style.left = `${event.clientX - iPageOffsetX}px`;
    this.oTooltip.style.top = `${(event.clientY / iZoomDivider) - iPageOffsetY}px`;
    clearTimeout(this.oTooltipTimeout);
    clearTimeout(this.oTooltipSubTimeout);
    this.oTooltipTimeout = setTimeout(() => {
      this.hide();
    }, 5000);
  }

  hide() {
    clearTimeout(this.oTooltipTimeout);
    clearTimeout(this.oTooltipSubTimeout);
    this.oTooltip.className = 'tooltip is-transparent';
    this.oTooltipSubTimeout = setTimeout(() => {
      this.oTooltip.className = 'tooltip is-transparent is-hidden';
    }, 300);
  }

}

module.exports = Tooltip;
