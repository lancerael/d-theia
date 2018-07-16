import * as d3 from 'd3';
import Tooltip from '../src/components/Tooltip';

describe('Key', () => {
  let oTooltip;
  let dDiv;

  beforeEach(() => {
    dDiv = document.createElement('div');
    oTooltip = new Tooltip(dDiv);
  });

  it('should create the tooltip and return chained object', () => {
    const oChainedTooltip = oTooltip.create();
    expect(d3.select(dDiv).selectAll('.tooltip.is-transparent').size()).toBe(1);
    expect(oChainedTooltip).toEqual(oTooltip);
  });

  it('should ping the tooltip in location with correct content', () => {
    oTooltip.create();
    oTooltip.ping('test');
    expect(d3.select(dDiv).selectAll('.tooltip.is-transparent').size()).toBe(0);
    expect(oTooltip.dTooltip.style.left).toBe('auto');
    expect(oTooltip.dTooltip.style.top).toBe('0px');
  });
});
