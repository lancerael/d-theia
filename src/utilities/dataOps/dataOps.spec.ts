import { sliceSampleData } from './'

describe('DataOps', () => {
  it('should return a sample from a larger array', () => {
    const chartData = [2, 5, 8, 3, 4, 6]
    const aSample = sliceSampleData(chartData, 3)
    const length = aSample.length
    expect(Array.isArray(aSample)).toBe(true)
    expect(length).toBeGreaterThan(0)
    expect(length).toBeLessThanOrEqual(3)
  })
})
