const AxisChart = require('../src/components/axis-chart.js');

describe('AxisChart', () => {
  let oAxisChart;

  beforeEach(() => {
    const oDiv = document.createElement('div');
    oAxisChart = new AxisChart({
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
    oAxisChart.setDimensions();
    expect(oAxisChart.oScaleX.domain()[0]).toBe('six');
    expect(oAxisChart.oScaleX.domain()[1]).toBe('nine');
    expect(oAxisChart.oScaleY.domain()[1]).toBe(8);
  });

  it('should render the chart group', () => {
    oAxisChart.renderChart();
    expect(oAxisChart.oChartG.size()).toBe(1);
  });
});
