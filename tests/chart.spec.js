const Chart = require('../src/components/chart.js');

describe('Chart', () => {
  let oChart;

  beforeEach(() => {
    oChart = new Chart();
  });

  it('should use ID string to get DOM element', () => {
    const oDiv = document.createElement('div');
    oDiv.setAttribute('id', 'test');
    document.body.appendChild(oDiv);
    oChart = new Chart({ sContainer: 'test' });
    expect(oChart.oContainer).toEqual(oDiv);
  });

  it('should set valid container node', () => {
    const oDiv = document.createElement('div');
    const fnUpdate = () => {
      oChart.setContainer(oDiv);
    };
    expect(fnUpdate.bind(oDiv)).not.toThrow();
    expect(oChart.oContainer).toEqual(oDiv);
  });

  it('should throw error message for invalid container node', () => {
    const fnUpdate = () => {
      oChart.setContainer({});
    };
    expect(fnUpdate.bind()).toThrow();
  });

  it('should set valid json config', () => {
    const jConfig = { field: 'value' };
    const fnUpdate = () => {
      oChart.setConfig(jConfig);
    };
    expect(fnUpdate.bind()).not.toThrow();
    expect(oChart.jConfig).toEqual(jConfig);
  });

  it('should throw error message for missing json', () => {
    const fnUpdate = () => {
      oChart.setConfig();
    };
    expect(fnUpdate.bind()).toThrow();
  });

  it('should set valid data', () => {
    const aData = [{ field: 'value' }];
    const fnUpdate = () => {
      oChart.setData(aData);
    };
    expect(fnUpdate.bind()).not.toThrow();
    expect(oChart.aData).toEqual(aData);
  });

  it('should throw error message for missing data', () => {
    const fnUpdate = () => {
      oChart.setData();
    };
    expect(fnUpdate.bind()).toThrow();
  });

  it('should update the dimensions correctly', () => {
    oChart.setContainer(document.createElement('div'));
    const fnUpdate = () => {
      oChart.setDimensions();
    };
    expect(fnUpdate.bind()).not.toThrow();
    expect(typeof oChart.iWidth).toBe('number');
    expect(typeof oChart.iHeight).toBe('number');
  });

  it('should throw error message for dimensions when missing container', () => {
    const fnUpdate = () => {
      oChart.setDimensions();
    };
    expect(fnUpdate.bind()).toThrow();
  });

  it('should initialise the chart correctly', () => {
    const oDiv = document.createElement('div');
    oChart.setContainer(oDiv);
    oChart.setConfig({ field: 'value' });
    oChart.setData([{ field: 'value' }]);
    const fnInit = () => {
      oChart.init();
    };
    expect(fnInit.bind()).not.toThrow();
    expect(typeof oChart.oToolTip).toBe('object');
    expect(oChart.oSvg.parentNode).toEqual(oDiv);
  });

  it('should throw error message for incorrectly initialised chart', () => {
    const fnInit = () => {
      oChart.init();
    };
    expect(fnInit.bind()).toThrow();
  });
});
