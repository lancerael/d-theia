import { select } from 'd3-selection'
import Key from './'

describe('Key', () => {
  let key: any

  beforeEach(() => {
    const dDiv = document.createElement('div')
    key = new Key({
      d3Container: select(dDiv).append('g'),
      itemValues: [
        {
          key: 'k1',
          name: 'K1',
          sColour: 'red',
        },
        {
          key: 'k2',
          name: 'K2',
          sColour: 'blue',
        },
      ],
    })
  })

  it('should render the key', () => {
    key.render()
    expect(key.d3Container.selectAll('text.label').size()).toBe(2)
  })
})
