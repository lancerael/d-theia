import { getPromiseJSON, truncateString, getRandomInteger } from './'
import 'd3-fetch'

describe('General', () => {
  it.skip('should return a promise', () => {
    expect({}.toString.call(getPromiseJSON('./'))).toContain('Promise')
  })

  it('should throw an error when missing a path', () => {
    const getPromise: any = () => {
      getPromiseJSON()
    }
    expect(getPromise.bind()).toThrow()
  })

  it('should truncate a string', () => {
    expect(truncateString('qwertyuiop', 6)).toBe('qwe...')
  })

  it('should generate a random integer', () => {
    const random = getRandomInteger(3, 6)
    expect(typeof random).toBe('number')
    expect(random).toBeGreaterThanOrEqual(3)
    expect(random).toBeLessThanOrEqual(6)
  })
})
