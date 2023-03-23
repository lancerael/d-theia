import DataOps from './'

describe('DataOps', () => {
  it('should return a sample from a larger array', () => {
    const aData = [2, 5, 8, 3, 4, 6]
    const aSample = DataOps.sliceSampleData(aData, 3)
    const iLength = aSample.length
    expect(Array.isArray(aSample)).toBe(true)
    expect(iLength).toBeGreaterThan(0)
    expect(iLength).toBeLessThanOrEqual(3)
  })
})
