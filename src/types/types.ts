import { BaseType, Selection } from 'd3-selection'
import { Transition } from 'd3-transition'

export type Contrast = 'light' | 'dark'

export type ChartType = 'line' | 'bubble' | 'bar'

export interface ConfigItemValue {
  name: string
  key?: string
  color?: string
  colors?: string[]
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

export interface AxisChartConfig extends ChartConfig {
  truncateSize?: number
  clickCallback?: (event: MouseEvent, d: any) => void
}

export interface BarChartConfig extends AxisChartConfig {
  barType: 'side'
}

export type Hash = { [key: number | string]: number | string }

export type DataItem = {
  itemLabel: string
  itemValues: number[]
}

export type ChartData = DataItem[]

export interface ChartParams<T = ChartConfig> {
  chartConfig: T
  chartData: ChartData
  d3Container?: Selection<SVGElement, any, any, any>
  container?: HTMLElement
  doTransform?: boolean
  containerId?: string
  shouldAddColors?: boolean
  transitionTime?: number
}

export type SVGSelection = Selection<SVGSVGElement, unknown, null, undefined>
export type AxisSelection = Selection<SVGGElement, unknown, null, undefined>
export type ChartSelection = Selection<BaseType, unknown, SVGGElement, unknown>
export type GroupSelection = Selection<BaseType, unknown, BaseType, unknown>
export type DivSelection = Selection<HTMLDivElement, unknown, null, undefined>
export type ChartTransition = Transition<
  BaseType,
  unknown,
  SVGGElement,
  unknown
>

export type ChartEventListener =
  | ((this: Window | HTMLElement, ev: UIEvent) => any)
  | void
