import { select } from 'd3-selection'
import Tooltip from './'

describe('Key', () => {
  let tooltip: any
  let dDiv: any

  beforeEach(() => {
    dDiv = document.createElement('div')
    tooltip = new Tooltip(dDiv)
  })

  it('should create the tooltip and return chained object', () => {
    const oChainedTooltip = tooltip.create()
    expect(select(dDiv).selectAll('.tooltip.is-transparent').size()).toBe(1)
    expect(oChainedTooltip).toEqual(tooltip)
  })

  it('should ping the tooltip in location with correct content', () => {
    tooltip.create()
    tooltip.ping('test', { clientX: 0, clientY: 0 })
    expect(select(dDiv).selectAll('.tooltip.is-transparent').size()).toBe(0)
    expect(tooltip.tooltip.style.right).toBe('10px')
    expect(tooltip.tooltip.style.top).toBe('0px')
  })
})
