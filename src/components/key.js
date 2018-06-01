/**
* The Key shows how the colours represent the data
*
* @class Key
* @constructor
*/
export default class Key {
  d3Container;
  aValues;
  iOffsetX;
  iOffsetY;

  /**
  * Constructor function that sets up the local object.
  *
  * @method constructor
  * @param {d3 Collection} d3Container A d3 wrapped container element
  * @param {Array} aValues the data to be displayed
  * @param {Integer} iOffsetX optional x offset
  * @param {Integer} iOffsetY optional y offset
  */
  constructor({ d3Container, aValues, iOffsetX = 0, iOffsetY = 0 }) {
    if (d3Container && aValues) {
      this.d3Container = d3Container;
      this.aValues = aValues.slice(aValues);
      this.iOffsetX = iOffsetX;
      this.iOffsetY = iOffsetY;
    } else {
      throw new Error('Incorrect parameters provided to Key constructor.');
    }
  }

  /**
  * Render the key showing the labels for the colour values
  *
  * @method render
  * @chainable
  */
  render() {
    this.d3Container.selectAll('g.key').remove();
    let iGroupOffset = 0;
    const d3KeyGroup = this.d3Container.append('g').attr('class', 'key');
    const d3Labels = d3KeyGroup.selectAll('text.label').data(this.aValues);
    const fnCalculateMargin = (aValues, i) => {
      let iMargin = 0;
      if (i) {
        for (let l = 0; l < i; l++) {
          iMargin += aValues[l].iLabelWidth;
        }
      }
      return iMargin;
    };
    d3Labels.enter()
      .append('text')
      .text(d => d.sName)
      .each((d, i, nodes) => {
        const iLabelWidth = nodes[i].getBoundingClientRect().width + 15;
        this.aValues[i].iLabelWidth = iLabelWidth;
        iGroupOffset += iLabelWidth - 2;
      })
      .attr('class', 'label')
      .attr('x', (d, i) => fnCalculateMargin(this.aValues, i))
      .attr('y', 8)
      .attr('width', 10)
      .attr('height', 10)
      .attr('font-family', 'sans-serif')
      .attr('font-size', '10px')
      .attr('fill', '#222222');
    const d3Keys = d3KeyGroup.selectAll('rect.key').data(this.aValues);
    d3Keys.enter()
      .append('rect')
      .attr('class', 'key')
      .attr('fill', d => d.sColour)
      .attr('x', (d, i) => fnCalculateMargin(this.aValues, i) - 12)
      .attr('y', 0)
      .attr('width', 10)
      .attr('height', 10);
    iGroupOffset = this.iOffsetX - (iGroupOffset / 2);
    d3KeyGroup.attr('transform', `translate(${iGroupOffset},${this.iOffsetY})`);
    return this;
  }


}

module.exports = Key;
