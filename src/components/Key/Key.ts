import { ConfigItemValue, SVGSelection } from '../../types'

export type KeyParams = Pick<
  Key,
  'd3Container' | 'itemValues' | 'offsetX' | 'offsetY' | 'keyType'
>

/**
 * The Key shows how the colors represent the data
 *
 * @public
 */
export default class Key {
  /**
   * d3 object for axis container
   */
  public d3Container!: SVGSelection

  /**
   * The key's values
   */
  public itemValues!: ConfigItemValue[]

  /**
   * The x offset for the key
   */
  public offsetX: number = 0

  /**
   * The y offset for the key
   */
  public offsetY: number = 0

  /**
   * The type of chart
   */
  public keyType?: string = 'bar'

  constructor(keyParams: KeyParams) {
    if (keyParams.d3Container && keyParams.itemValues) {
      Object.assign(this, keyParams)
    } else {
      throw new Error('Incorrect parameters provided to Key constructor.')
    }
  }

  /**
   * Render the key showing the labels for the color values
   */
  public render() {
    this.d3Container.selectAll('g.key').remove()
    let groupOffset = 0
    const d3KeyGroup = this.d3Container.append('g').attr('class', 'key')
    const labelWidths: number[] = []
    const fnCalculateMargin = (i: number) =>
      labelWidths.slice(0, i).reduce((margin, width) => margin + width, 0)

    // Add key labels
    d3KeyGroup
      .selectAll('text.label')
      .data(this.itemValues)
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

    // Add coloured squares
    d3KeyGroup
      .selectAll('rect.key')
      .data(this.itemValues)
      .enter()
      .append('rect')
      .attr('class', 'key')
      .attr('fill', (d: any) => d.color)
      .attr('x', (d: any, i: number) => !!d && fnCalculateMargin(i) - 12)
      .attr('y', 0)
      .attr('width', 10)
      .attr('height', 10)

    // Move to correct posision
    d3KeyGroup.attr(
      'transform',
      `translate(${this.offsetX - groupOffset / 2},${this.offsetY})`
    )
    return this
  }
}
