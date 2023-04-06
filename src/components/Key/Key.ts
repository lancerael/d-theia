/**
 * The Key shows how the colors represent the data
 *
 * @class Key
 * @constructor
 */
export default class Key {
  /**
   * d3 object for axis container
   *
   * @property d3Container
   * @type {Object}
   */
  d3Container

  /**
   * The key's values
   *
   * @property aValues
   * @type {Array}
   */
  aValues

  /**
   * The x offset for the key
   *
   * @property iOffsetX
   * @type {Number}
   */
  iOffsetX

  /**
   * The y offset for the key
   *
   * @property iOffsetY
   * @type {Number}
   */
  iOffsetY

  /**
   * Constructor function that sets up the local object.
   *
   * @method constructor
   * @param {Object} d3Container A d3 wrapped container element
   * @param {Array} aValues the data to be displayed
   * @param {Integer} iOffsetX optional x offset
   * @param {Integer} iOffsetY optional y offset
   */
  constructor({ d3Container, aValues, iOffsetX = 0, iOffsetY = 0 }: any) {
    if (d3Container && aValues) {
      this.d3Container = d3Container
      this.aValues = aValues.slice(aValues)
      this.iOffsetX = iOffsetX
      this.iOffsetY = iOffsetY
    } else {
      throw new Error('Incorrect parameters provided to Key constructor.')
    }
  }

  /**
   * Render the key showing the labels for the color values
   *
   * @method render
   * @chainable
   */
  render() {
    this.d3Container.selectAll('g.key').remove()
    let iGroupOffset = 0
    const d3KeyGroup = this.d3Container.append('g').attr('class', 'key')
    const d3Labels = d3KeyGroup.selectAll('text.label').data(this.aValues)
    const labelWidths: number[] = []
    const fnCalculateMargin = (i: number) => {
      let iMargin = 0
      if (i) {
        for (let l = 0; l < i; l++) {
          iMargin += labelWidths[l]
        }
      }
      return iMargin
    }
    d3Labels
      .enter()
      .append('text')
      .text((d: any) => d.sName)
      .each((d: any, i: number, nodes: any) => {
        const iLabelWidth = nodes[i].getBoundingClientRect().width + 15
        labelWidths.push(iLabelWidth)
        iGroupOffset += iLabelWidth - 2
        d
      })
      .attr('class', 'label')
      .attr('x', (d: any, i: number) => !!d && fnCalculateMargin(i))
      .attr('y', 8)
      .attr('width', 10)
      .attr('height', 10)
      .attr('font-family', 'sans-serif')
      .attr('font-size', '10px')
      .attr('style', 'fill: #222222')
    const d3Keys = d3KeyGroup.selectAll('rect.key').data(this.aValues)
    d3Keys
      .enter()
      .append('rect')
      .attr('class', 'key')
      .attr('fill', (d: any) => d.sColor)
      .attr('x', (d: any, i: number) => !!d && fnCalculateMargin(i) - 12)
      .attr('y', 0)
      .attr('width', 10)
      .attr('height', 10)
    iGroupOffset = this.iOffsetX - iGroupOffset / 2
    d3KeyGroup.attr('transform', `translate(${iGroupOffset},${this.iOffsetY})`)
    return this
  }

  /**
   * Set the position of the key
   *
   * @method position
   * @chainable
   */
  position() {
    // placeholder
    return this
  }
}
