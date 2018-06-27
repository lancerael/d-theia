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
  * @param {Mixed (Array/String)} mContent values or string for content
  */
  ping(mContent) {
    const sContent = mContent.constructor === Array
      ? `<strong>${mContent[0]}</strong><br>${mContent[1]}: <em>${mContent[2]}</em>`
      : mContent;
    const iZoomDivider = 1 + (window.devicePixelRatio > 1 ? (window.devicePixelRatio / 20) : 0);
    const oContainerEdges = this.oContainer.getBoundingClientRect()
    const iPageOffsetX = oContainerEdges.left - 15;
    const iPageOffsetY = oContainerEdges.top;
    const iMouseX = event.clientX;
    this.oTooltip.innerHTML = sContent;
    this.oTooltip.className = 'tooltip';
    if ((oContainerEdges.width + iPageOffsetX) - iMouseX < 90) {
      this.oTooltip.style.left = 'auto';
      this.oTooltip.style.right = `${(oContainerEdges.width - iMouseX) + iPageOffsetX + 25}px`;
    } else {
      this.oTooltip.style.left = `${iMouseX - iPageOffsetX}px`;
      this.oTooltip.style.right = 'auto';
    }
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
