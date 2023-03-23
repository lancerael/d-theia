import { select } from 'd3-selection'
import Tooltip from './'

describe('Key', () => {
  let oTooltip: any
  let dDiv: any

  beforeEach(() => {
    dDiv = document.createElement('div')
    oTooltip = new Tooltip(dDiv)
  })

  it('should create the tooltip and return chained object', () => {
    const oChainedTooltip = oTooltip.create()
    expect(select(dDiv).selectAll('.tooltip.is-transparent').size()).toBe(1)
    expect(oChainedTooltip).toEqual(oTooltip)
  })

  it('should ping the tooltip in location with correct content', () => {
    oTooltip.create()
    oTooltip.ping('test')
    expect(select(dDiv).selectAll('.tooltip.is-transparent').size()).toBe(0)
    expect(oTooltip.dTooltip.style.right).toBe('10px')
    expect(oTooltip.dTooltip.style.top).toBe('0px')
  })
})
