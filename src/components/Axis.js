import { axisBottom, axisLeft } from 'd3-axis';
import Utilities from './Utilities';

/**
* The Axis object is used to instantiate x and y axes, as well as labels
*
* @class Axis
* @constructor
*/
export default class Axis {

  /**
  * d3 object for axis container
  *
  * @property d3Container
  * @type {Object}
  */
  d3Container;

  /**
  * Amount to truncate axis labels to
  *
  * @property iTruncate
  * @type {Object}
  */
  iTruncate;

  /**
  * Collection of axis labels
  *
  * @property aAxisLabels
  * @type {Array}
  */
  aAxisLabels;

  /**
  * Scale object for the x axis
  *
  * @property oScaleX
  * @type {Object}
  */
  oScaleX;

  /**
  * Scale object for the y axis
  *
  * @property oScaleY
  * @type {Object}
  */
  oScaleY;

  /**
  * Chart's tooltip object
  *
  * @property oTooltip
  * @type {Object}
  */
  oTooltip;

  /**
  * The current calculated width of the chart
  *
  * @property iWidth
  * @type {Number}
  */
  iWidth;

  /**
  * The current calculated height of the chart
  *
  * @property iHeight
  * @type {Number}
  */
  iHeight;

  /**
  * The padding for the chart within the container
  *
  * @property jPadding
  * @type {Object}
  */
  jPadding;

  /**
  * Constructor function which sets up the local object.
  *
  * @method constructor
  * @param {Object} oParams configuration parameters object
  * @throws {Error} invalid parameters
  */
  constructor(oParams) {
    if (oParams.d3Container) {
      Object.assign(this, oParams);
    } else {
      throw new Error('Incorrect parameters provided to Axis constructor.');
    }
  }

  /**
  * Master render to call all rendering methods
  *
  * @method render
  * @chainable
  */
  render() {
    this.renderAxisX();
    this.renderAxisY();
    this.renderLabels();
    return this;
  }

  /**
  * Render only the x axis
  *
  * @method renderAxisX
  */
  renderAxisX() {
    this.d3Container.selectAll('g.x-axis').remove();
    this.d3Container.append('g')
        .attr('class', 'x-axis')
        .call(axisBottom(this.oScaleX))
        .attr('transform', `translate(${this.jPadding.l},${this.iHeight})`)
        .selectAll('text')
          .attr('x', -5)
          .attr('y', 6)
          .attr('transform', 'rotate(310)')
          .attr('class', 'x-labels')
          .text(d => Utilities.truncateString(d, this.iTruncate))
          .style('text-anchor', 'end')
          .on('mousemove', (d) => {
            if (this.oTooltip && d.length > this.iTruncate) {
              this.oTooltip.ping(`<strong>${d}</strong>`);
            }
          });
  }

  /**
  * Render only the y axis
  *
  * @method renderAxisY
  */
  renderAxisY() {
    this.d3Container.selectAll('g.y-axis').remove();
    this.d3Container.append('g')
        .attr('class', 'y-axis')
        .call(axisLeft(this.oScaleY))
        .attr('transform', `translate(${this.jPadding.l},0)`)
        .selectAll('.y-axis .tick line')
          .attr('x2', () => this.iWidth);
  }

  /**
  * Render only the labels
  *
  * @method renderLabels
  */
  renderLabels() {
    this.d3Container.selectAll('text.labels').remove();
    this.d3Container.append('text')
        .attr('class', 'labels')
        .attr('x', (this.iHeight / -2) - (this.jPadding.t / 2))// - ((this.jConfig.aAxisLabels[0].length / 2) * 7))
        .attr('y', 10)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text(this.aAxisLabels[0]);
    this.d3Container.append('text')
        .attr('class', 'labels')
        .attr('x', ((this.iWidth + this.jPadding.l + this.jPadding.r) / 2))// - ((this.aAxisLabels[1].length / 2) * 2))
        .attr('y', this.iHeight + (this.jPadding.b - 5))
        .attr('text-anchor', 'middle')
        .text(this.aAxisLabels[1]);
  }

}

module.exports = Axis;
