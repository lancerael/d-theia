const BarChart = require('../src/components/bar-chart.js');

describe('BarChart', () => {
  let oBarChart;

  beforeEach(() => {
    const oDiv = document.createElement('div');
    oBarChart = new BarChart({
      oContainer: oDiv,
      jConfig: {
        aAxisKeys: ['k3'],
        aAxisLabels: ['y', 'x'],
        aValues: [
          {
            sKey: 'k1',
            sName: 'K1',
            sColour: 'red',
          },
          {
            sKey: 'k2',
            sName: 'K2',
            sColour: 'blue',
          }
        ]
      },
      aData: [{ k1: 4, k2: 5, k3: 'six' }, { k1: 7, k2: 8, k3: 'nine' }]
    });
  });

  it('should set up the scale objects', () => {
    oBarChart.setDimensions();
    expect(oBarChart.oScaleX.domain()[0]).toBe('six');
    expect(oBarChart.oScaleX.domain()[1]).toBe('nine');
    expect(oBarChart.oScaleY.domain()[1]).toBe(8);
  });

  it('should render the chart', () => {
    oBarChart.renderChart();
    expect(oBarChart.aBars.length).toBe(2);
    expect(oBarChart.oBarsG.selectAll('rect.bars').size()).toEqual(oBarChart.jConfig.aValues.length * oBarChart.aData.length);
  });
});
