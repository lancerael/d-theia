const BubbleChart = require('../src/components/bubble-chart.js');

describe('BubbleChart', () => {
  let oBubbleChart;

  beforeEach(() => {
    const oDiv = document.createElement('div');
    oBubbleChart = new BubbleChart({
      oContainer: oDiv,
      jConfig: {
        aAxisLabels: ['y', 'x'],
        aValues: [
          {
            sKey: 'k1',
            sName: 'K1'
          },
          {
            sKey: 'k2',
            sName: 'K2',
            aColours: ['blue', 'red']
          }
        ]
      },
      aData: [{ k1: 4, k2: 5 }, { k1: 7, k2: 8 }]
    });
  });

  it('should set up the scale object', () => {
    oBubbleChart.setDimensions();
    expect(oBubbleChart.oScaleColour.domain()[1]).toBe(8);
    expect(oBubbleChart.oScaleColour.range()[1]).toBe('red');
  });

  it('should render the chart', () => {
    oBubbleChart.renderChart();
    expect(oBubbleChart.oBubblesG.selectAll('circle.circles').size()).toBe(2);
    expect(oBubbleChart.oForce.nodes().length).toBe(2);
  });
});
