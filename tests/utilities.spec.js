const Utilities = require('../src/components/utilities.js');

describe('Utilities', () => {
  it('should return a promise', () => {
    expect(Object.prototype.toString.call(Utilities.getPromiseJSON('path'))).toContain('Promise');
  });

  it('should throw an error when missing a path', () => {
    const fnGetPromise = () => {
      Utilities.getPromiseJSON();
    };
    expect(fnGetPromise.bind()).toThrow();
  });

  it('should truncate a string', () => {
    expect(Utilities.truncateString('qwertyuiop', 6)).toBe('qwe[...]');
  });

  it('should generate a random integer', () => {
    const iRandom = Utilities.generateRandomInteger(3, 6);
    expect(typeof iRandom).toBe('number');
    expect(iRandom).toBeGreaterThanOrEqual(3);
    expect(iRandom).toBeLessThanOrEqual(6);
  });

  it('should return a sample from a larger array', () => {
    const aData = [2, 5, 8, 3, 4, 6];
    const aSample = Utilities.sliceSampleData(aData, 3);
    const iLength = aSample.length;
    expect({}.toString.call(aSample)).toBe('[object Array]');
    expect(iLength).toBeGreaterThan(0);
    expect(iLength).toBeLessThanOrEqual(3);
  });
});
