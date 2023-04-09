import { BaseType, Selection } from 'd3-selection'

export type Contrast = 'light' | 'dark'

export type ChartType = 'line' | 'bubble' | 'bar'

export interface ConfigItemValue {
  name: string
  key?: string
  color?: string
}

export interface Padding {
  l: number
  r: number
  t: number
  b: number
}

export interface ChartConfig {
  title?: string
  axisLabels: [string, string]
  itemValues: ConfigItemValue[]
  axisKeys?: string[]
  doTrim?: boolean
  padding?: Padding
}

export type Hash = { [key: string]: number | string }

export type DataItem = {
  itemLabel: string
  itemValues: number[]
}

export type ChartData = (DataItem | Hash)[]

export interface ChartParams {
  chartConfig: ChartConfig
  chartData: ChartData
  d3Container?: Selection<SVGElement, any, any, any>
  container?: HTMLElement
  doTransform?: boolean
}

export type AxisSelection = Selection<SVGGElement, unknown, null, undefined>
export type ChartSelection = Selection<BaseType, unknown, SVGGElement, unknown>
