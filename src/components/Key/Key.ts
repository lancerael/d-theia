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
   * @property itemValues
   * @type {Array}
   */
  itemValues

  /**
   * The x offset for the key
   *
   * @property offsetX
   * @type {Number}
   */
  offsetX

  /**
   * The y offset for the key
   *
   * @property offsetY
   * @type {Number}
   */
  offsetY

  /**
   * Constructor function that sets up the local object.
   *
   * @method constructor
   * @param {Object} d3Container A d3 wrapped container element
   * @param {Array} itemValues the data to be displayed
   * @param {Integer} offsetX optional x offset
   * @param {Integer} offsetY optional y offset
   */
  constructor({ d3Container, itemValues, offsetX = 0, offsetY = 0 }: any) {
    if (d3Container && itemValues) {
      this.d3Container = d3Container
      this.itemValues = itemValues.slice(itemValues)
      this.offsetX = offsetX
      this.offsetY = offsetY
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
    let groupOffset = 0
    const d3KeyGroup = this.d3Container.append('g').attr('class', 'key')
    const d3Labels = d3KeyGroup.selectAll('text.label').data(this.itemValues)
    const labelWidths: number[] = []
    const fnCalculateMargin = (i: number) => {
      let margin = 0
      if (i) {
        for (let l = 0; l < i; l++) {
          margin += labelWidths[l]
        }
      }
      return margin
    }
    d3Labels
      .enter()
      .append('text')
      .text((d: any) => d.name)
      .each((d: any, i: number, nodes: any) => {
        const labelWidth = nodes[i].getBoundingClientRect().width + 15
        labelWidths.push(labelWidth)
        groupOffset += labelWidth - 2
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
    const d3Keys = d3KeyGroup.selectAll('rect.key').data(this.itemValues)
    d3Keys
      .enter()
      .append('rect')
      .attr('class', 'key')
      .attr('fill', (d: any) => d.color)
      .attr('x', (d: any, i: number) => !!d && fnCalculateMargin(i) - 12)
      .attr('y', 0)
      .attr('width', 10)
      .attr('height', 10)
    groupOffset = this.offsetX - groupOffset / 2
    d3KeyGroup.attr('transform', `translate(${groupOffset},${this.offsetY})`)
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
