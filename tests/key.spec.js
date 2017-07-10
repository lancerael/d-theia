const d3 = require('d3');
const Key = require('../src/components/key.js');

describe('Key', () => {
  let oKey;

  beforeEach(() => {
    const oDiv = document.createElement('div');
    oKey = new Key({
      oContainer: d3.select(oDiv).append('g'),
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
    });
  });

  it('should render the key', () => {
    oKey.render();
    expect(oKey.oContainer.selectAll('text.label').size()).toBe(2);
  });
});
