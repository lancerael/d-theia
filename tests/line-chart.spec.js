const LineChart = require('../src/components/line-chart.js');

describe('LineChart', () => {
  let oLineChart;

  beforeEach(() => {
    const oDiv = document.createElement('div');
    oLineChart = new LineChart({
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

  it('should render the chart', () => {
    oLineChart.renderChart();
    expect(oLineChart.aLines.length).toBe(2);
    expect(oLineChart.oChartG.selectAll('path.line').size()).toEqual(oLineChart.jConfig.aValues.length);
  });
});
