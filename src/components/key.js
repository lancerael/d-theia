/**
* The Key shows how the colours represent the data
*
* @class Key
* @constructor
*/
export default class Key {
  oContainer;
  aValues;
  iOffsetX;
  iOffsetY;

  /**
  * Constructor function that sets up the local object.
  *
  * @method constructor
  * @param {DOM Element} oContainer DOM object
  * @param {Array} aValues the data to be displayed
  * @param {Integer} iOffsetX optional x offset
  * @param {Integer} iOffsetY optional y offset
  */
  constructor({ oContainer, aValues, iOffsetX = 0, iOffsetY = 0 }) {
    if (oContainer && aValues) {
      this.oContainer = oContainer;
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
  */
  render() {
    this.oContainer.selectAll('g.key').remove();
    let iGroupOffset = 0;
    const oKeyG = this.oContainer.append('g').attr('class', 'key');
    const aLabels = oKeyG.selectAll('text.label').data(this.aValues);
    const calculateMargin = (aValues, i) => {
      let iMargin = 0;
      if (i) {
        for (let l = 0; l < i; l++) {
          iMargin += aValues[l].iLabelWidth;
        }
      }
      return iMargin;
    };
    aLabels.enter()
      .append('text')
      .text(d => d.sName)
      .each((d, i, nodes) => {
        const iLabelWidth = nodes[i].getBoundingClientRect().width + 15;
        this.aValues[i].iLabelWidth = iLabelWidth;
        iGroupOffset += iLabelWidth - 2;
      })
      .attr('class', 'label')
      .attr('x', (d, i) => calculateMargin(this.aValues, i))
      .attr('y', 8)
      .attr('width', 10)
      .attr('height', 10)
      .attr('font-family', 'sans-serif')
      .attr('font-size', '10px')
      .attr('fill', '#222222');
    const aKeys = oKeyG.selectAll('rect.key').data(this.aValues);
    aKeys.enter()
      .append('rect')
      .attr('class', 'key')
      .attr('fill', d => d.sColour)
      .attr('x', (d, i) => calculateMargin(this.aValues, i) - 12)
      .attr('y', 0)
      .attr('width', 10)
      .attr('height', 10);
    iGroupOffset = this.iOffsetX - (iGroupOffset / 2);
    oKeyG.attr('transform', `translate(${iGroupOffset},${this.iOffsetY})`);
    return this;
  }


}

module.exports = Key;
