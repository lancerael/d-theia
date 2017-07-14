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
  ping(x, y, sContent) {
    const iPageOffsetY = window.pageYOffset
      || document.documentElement.scrollTop
      || document.body.scrollTop || 0;
    this.oTooltip.innerHTML = sContent;
    this.oTooltip.className = 'tooltip is-transparent';
    this.oTooltip.className = 'tooltip';
    this.oTooltip.style.left = `${x}px`;
    this.oTooltip.style.top = `${y + iPageOffsetY}px`;
    clearTimeout(this.oTooltipTimeout);
    clearTimeout(this.oTooltipSubTimeout);
    this.oTooltipTimeout = setTimeout(() => {
      this.hideTooltip();
    }, 5000);
  }

  hide() {
    clearTimeout(this.oTooltipTimeout);
    clearTimeout(this.oTooltipSubTimeout);
    this.oTooltip.className = 'tooltip is-transparent';
    this.oTooltipSubTimeout = setTimeout(() => {
      this.oTooltip.className = 'tooltip is-transparent is-hidden';
    }, 1000);
  }

}

module.exports = Tooltip;
