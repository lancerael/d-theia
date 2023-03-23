import { select } from 'd3-selection'
import Key from './'

describe('Key', () => {
  let oKey: any

  beforeEach(() => {
    const dDiv = document.createElement('div')
    oKey = new Key({
      d3Container: select(dDiv).append('g'),
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
        },
      ],
    })
  })

  it('should render the key', () => {
    oKey.render()
    expect(oKey.d3Container.selectAll('text.label').size()).toBe(2)
  })
})
