import { event } from 'd3-selection';

/**
* The Tooltip
*
* @class Tooltip
* @constructor
*/
export default class Tooltip {

  /**
  * DOM reference to container element
  *
  * @property dContainer
  * @type {Object}
  */
  oContainer;

  /**
  * DOM reference to tooltip's main element
  *
  * @property dTooltip
  * @type {Object}
  */
  dTooltip;

  /**
  * Tooltip's main timeout to close tooltip
  *
  * @property oTooltipTimeout
  * @type {Object}
  */
  oTooltipTimeout;

  /**
  * Tooltip's sub timeout to hide tooltip
  *
  * @property oTooltipSubTimeout
  * @type {Object}
  */
  oTooltipSubTimeout;

  /**
  * Constructor function that sets up the local object.
  *
  * @method constructor
  * @param {Object} dContainer DOM object
  */
  constructor(dContainer) {
    if (dContainer.nodeName) {
      this.dContainer = dContainer;
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
    this.dTooltip = document.createElement('div');
    this.dTooltip.className = 'tooltip is-transparent is-hidden';
    this.dContainer.appendChild(this.dTooltip);
    return this;
  }

  /**
  * Ping the tooltip with data and location
  *
  * @method ping
  * @param {Array} mContent values or string for content
  */
  ping(mContent) {
    const sContent = mContent.constructor === Array
      ? `<strong>${mContent[0]}</strong><br>${mContent[1]}: <em>${mContent[2]}</em>`
      : mContent;
    const iZoomDivider = 1 + (window.devicePixelRatio > 1 ? (window.devicePixelRatio / 20) : 0);
    const oContainerEdges = this.dContainer.getBoundingClientRect()
    const iPageOffsetX = oContainerEdges.left - 15;
    const iPageOffsetY = oContainerEdges.top;
    const iMouseX = event ? event.clientX : 0;
    const iMouseY = event ? event.clientY : 0;
    this.dTooltip.innerHTML = sContent;
    this.dTooltip.className = 'tooltip';
    if ((oContainerEdges.width + iPageOffsetX) - iMouseX < 90) {
      this.dTooltip.style.left = 'auto';
      this.dTooltip.style.right = `${(oContainerEdges.width - iMouseX) + iPageOffsetX + 25}px`;
    } else {
      this.dTooltip.style.left = `${iMouseX - iPageOffsetX}px`;
      this.dTooltip.style.right = 'auto';
    }
    this.dTooltip.style.top = `${(iMouseY / iZoomDivider) - iPageOffsetY}px`;
    clearTimeout(this.oTooltipTimeout);
    clearTimeout(this.oTooltipSubTimeout);
    this.oTooltipTimeout = setTimeout(() => {
      this.hide();
    }, 5000);
  }

  hide() {
    clearTimeout(this.oTooltipTimeout);
    clearTimeout(this.oTooltipSubTimeout);
    this.dTooltip.className = 'tooltip is-transparent';
    this.oTooltipSubTimeout = setTimeout(() => {
      this.dTooltip.className = 'tooltip is-transparent is-hidden';
    }, 300);
  }

}
