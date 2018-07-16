import Utilities from '../src/components/Utilities';
import 'd3-fetch';

describe('Utilities', () => {

  xit('should return a promise', () => {
    expect({}.toString.call(Utilities.getPromiseJSON('path'))).toContain('Promise');
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
    const iRandom = Utilities.getRandomInteger(3, 6);
    expect(typeof iRandom).toBe('number');
    expect(iRandom).toBeGreaterThanOrEqual(3);
    expect(iRandom).toBeLessThanOrEqual(6);
  });

});
