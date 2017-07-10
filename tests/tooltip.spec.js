const d3 = require('d3');
const Tooltip = require('../src/components/tooltip.js');

describe('Key', () => {
  let oTooltip;
  let oDiv;

  beforeEach(() => {
    oDiv = document.createElement('div');
    oTooltip = new Tooltip(oDiv);
  });

  it('should create the tooltip and return chained object', () => {
    const oChainedTooltip = oTooltip.create();
    expect(d3.select(oDiv).selectAll('.tooltip.is-transparent').size()).toBe(1);
    expect(oChainedTooltip).toEqual(oTooltip);
  });

  it('should ping the tooltip in location with correct content', () => {
    oTooltip.create();
    oTooltip.ping(10, 10, 'test');
    expect(d3.select(oDiv).selectAll('.tooltip.is-transparent').size()).toBe(0);
    expect(oTooltip.oTooltip.style.left).toBe('10px');
    expect(oTooltip.oTooltip.style.top).toBe('10px');
  });
});
