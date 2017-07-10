const d3 = require('d3');
const Axis = require('../src/components/axis.js');

describe('Axis', () => {
  let oAxis;

  beforeEach(() => {
    const oDiv = document.createElement('div');
    oAxis = new Axis({
      oContainer: d3.select(oDiv).append('g'),
      oScaleX: d3.scaleBand().padding(0.2),
      oScaleY: d3.scaleLinear(),
      jPadding: { l: 5, r: 5, t: 5, b: 5 },
      aAxisLabels: ['l1', 'l2']
    });
  });

  it('should call all render methods and return the object', () => {
    spyOn(oAxis, 'renderAxisX');
    spyOn(oAxis, 'renderAxisY');
    spyOn(oAxis, 'renderLabels');
    const oThis = oAxis.render();
    expect(oAxis.renderAxisX).toHaveBeenCalled();
    expect(oAxis.renderAxisY).toHaveBeenCalled();
    expect(oAxis.renderLabels).toHaveBeenCalled();
    expect(oThis).toEqual(oAxis);
  });

  it('should render the x axis', () => {
    oAxis.renderAxisX();
    expect(oAxis.oContainer.selectAll('g.x-axis').size()).toBe(1);
  });

  it('should render the y axis', () => {
    oAxis.renderAxisY();
    expect(oAxis.oContainer.selectAll('g.y-axis').size()).toBe(1);
  });

  it('should render the labels', () => {
    oAxis.renderLabels();
    const oLabels = oAxis.oContainer.selectAll('text.labels');
    expect(oLabels.size()).toBe(2);
    oLabels.each((d, i, elems) => {
      expect(elems[i].innerHTML).toBe(oAxis.aAxisLabels[i]);
    });
  });
});
