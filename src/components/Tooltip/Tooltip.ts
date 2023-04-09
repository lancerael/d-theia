/**
 * The Tooltip
 *
 * @class Tooltip
 * @constructor
 */
export default class Tooltip {
  /**
   * D3 reference to container element
   *
   * @property container
   * @type {Object}
   */
  container: any

  /**
   * DOM reference to tooltip's main element
   *
   * @property tooltip
   * @type {Object}
   */
  tooltip: any

  /**
   * Tooltip's main timeout to close tooltip
   *
   * @property tooltipTimeout
   * @type {Object}
   */
  tooltipTimeout: any

  /**
   * Tooltip's sub timeout to hide tooltip
   *
   * @property tooltipSubTimeout
   * @type {Object}
   */
  tooltipSubTimeout: any

  /**
   * Constructor function that sets up the local object.
   *
   * @method constructor
   * @param {Object} container DOM object
   */
  constructor(container: any) {
    if (container.nodeName) {
      this.container = container
    } else {
      throw new Error('The tooltip has no valid container element.')
    }
  }

  /**
   * Create the tooltip DOM and return object
   *
   * @method create
   * @chainable
   */
  create() {
    this.tooltip = document.createElement('div')
    this.tooltip.className = 'tooltip is-transparent is-hidden'
    this.container.appendChild(this.tooltip)
    return this
  }

  /**
   * Ping the tooltip with data and location
   *
   * @method ping
   * @param {Array} content values or string for content
   */
  ping(content: any, event: MouseEvent) {
    const contentHtml =
      content.constructor === Array
        ? `<strong>${content[0]}</strong><br>${content[1]}: <em>${content[2]}</em>`
        : content
    const iZoomDivider =
      1 + (window.devicePixelRatio > 1 ? window.devicePixelRatio / 20 : 0)
    const oContainerEdges = this.container.getBoundingClientRect()
    const pageOffsetX = oContainerEdges.left - 15
    const pageOffsetY = oContainerEdges.top
    const mouseX = event?.clientX ?? 0
    const mouseY = event?.clientY ?? 0
    this.tooltip.innerHTML = contentHtml
    this.tooltip.className = 'tooltip'
    if (oContainerEdges.width + pageOffsetX - mouseX < 90) {
      this.tooltip.style.left = 'auto'
      this.tooltip.style.right = `${
        oContainerEdges.width - mouseX + pageOffsetX + 25
      }px`
    } else {
      this.tooltip.style.left = `${mouseX - pageOffsetX}px`
      this.tooltip.style.right = 'auto'
    }
    this.tooltip.style.top = `${mouseY / iZoomDivider - pageOffsetY}px`
    clearTimeout(this.tooltipTimeout)
    clearTimeout(this.tooltipSubTimeout)
    this.tooltipTimeout = setTimeout(() => {
      this.hide()
    }, 5000)
  }

  hide() {
    clearTimeout(this.tooltipTimeout)
    clearTimeout(this.tooltipSubTimeout)
    this.tooltip.className = 'tooltip is-transparent'
    this.tooltipSubTimeout = setTimeout(() => {
      this.tooltip.className = 'tooltip is-transparent is-hidden'
    }, 300)
  }
}
