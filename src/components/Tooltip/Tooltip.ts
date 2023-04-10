/**
 * The Tooltip for showing info in a popup
 *
 * @public
 */
export default class Tooltip {
  /**
   * DOM reference to container element
   */
  container: HTMLElement

  /**
   * DOM reference to tooltip's main element
   */
  tooltip!: HTMLElement

  /**
   * Tooltip's main timeout to close tooltip
   */
  tooltipTimeout!: NodeJS.Timeout

  /**
   * Tooltip's sub timeout to hide tooltip
   */
  tooltipSubTimeout!: NodeJS.Timeout

  constructor(container: HTMLElement) {
    if (container.nodeName) {
      this.container = container
    } else {
      throw new Error('The tooltip has no valid container element.')
    }
  }

  /**
   * Create the tooltip DOM and return object
   */
  public create() {
    this.tooltip = document.createElement('div')
    this.tooltip.className = 'tooltip is-transparent is-hidden'
    this.container.appendChild(this.tooltip)
    return this
  }

  /**
   * Ping the tooltip to display with data at correct location
   * @param {string[] | string} content values or string for content
   * @param {MouseEvent} event the triggering event to get the location
   */
  public ping(content: string[] | string, event: MouseEvent) {
    const contentHtml =
      content.constructor === Array
        ? `<strong>${content[0]}</strong><br>${content[1]}: <em>${content[2]}</em>`
        : (content as string)
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

  /**
   * Hide the tooltip
   */
  public hide() {
    clearTimeout(this.tooltipTimeout)
    clearTimeout(this.tooltipSubTimeout)
    this.tooltip.className = 'tooltip is-transparent'
    this.tooltipSubTimeout = setTimeout(() => {
      this.tooltip.className = 'tooltip is-transparent is-hidden'
    }, 300)
  }
}
