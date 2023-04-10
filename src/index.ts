import BarChart from './components/BarChart'
import LineChart from './components/LineChart'
import BubbleChart from './components/BubbleChart'
import { ChartParams, ChartType } from './types'
export * from './utilities'
export * from './components'

export default class Theia {
  static chart(
    containerId: string,
    chartType: ChartType = 'bar',
    chartParams: ChartParams
  ) {
    const allParams = { containerId, ...chartParams }
    return {
      line: () => this.createLineChart(allParams),
      bubble: () => this.createBubbleChart(allParams),
      bar: () => this.createBarChart(allParams),
    }[chartType]()
  }

  static createBarChart(chartParams: ChartParams) {
    return new BarChart(chartParams).init()
  }

  static createLineChart(chartParams: ChartParams) {
    return new LineChart(chartParams).init()
  }

  static createBubbleChart(chartParams: ChartParams) {
    return new BubbleChart(chartParams).init()
  }
}
