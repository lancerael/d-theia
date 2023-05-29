import {
  ChartConfig,
  ChartData,
  ChartParams,
  DataItem,
  Hash,
} from '../../types'
import { getRandomInteger } from '../../utilities'
import { getRandomColor } from '../colors'
import { ConfigItemValue } from '../../types/index'

// Take a random subset of an array of data
export const sliceSampleData = (array: any[], maxLength = 50) => {
  const iStart = getRandomInteger(0, array.length - maxLength)
  const iEnd = iStart + getRandomInteger(3, maxLength)
  return array.slice(iStart, iEnd)
}

// Generate a new array of a certain lenghth, with a filler function
export const arr = <T>(
  length: number,
  filler: (index: number, _: string) => T
): T[] =>
  new Array(length)
    .fill('')
    .map((item, i) => filler(i, item))
    .reverse()

// generate new random data for the chart
export const getRandomData = (
  length: number = getRandomInteger(3, 10),
  groupSize: number = getRandomInteger(3, 5)
): ChartParams => {
  const rangeLow = getRandomInteger(1, 50)
  const rangeHigh = getRandomInteger(rangeLow, 200)
  return {
    chartConfig: {
      title: 'Random Chart Data',
      axisLabels: ['Y Axis', 'X Axis'],
      itemValues: addColoursToConfig(
        arr<ConfigItemValue>(groupSize, (i) => ({
          name: `Type ${groupSize - i}`,
        }))
      ),
      doTrim: true,
    },
    chartData: arr<DataItem>(length, (i) => ({
      itemLabel: `Item ${length - i}`,
      itemValues: arr<number>(groupSize, () =>
        getRandomInteger(rangeLow, rangeHigh)
      ),
    })),
  }
}

// Get an emptry chart params object for a new chart
export const getEmptyData = (): ChartParams => {
  return {
    chartConfig: {
      title: '',
      axisLabels: ['', ''],
      itemValues: addColoursToConfig([{ name: '' }]),
      doTrim: true,
    },
    chartData: [{ itemLabel: '', itemValues: [0] }],
  }
}

// Transform the data if we have non-standard keys
export const transformDataKeys = (
  chartConfig: ChartConfig,
  chartData: ChartData
) => {
  return chartData.map((item) => {
    if (chartConfig.itemValues && !item.itemValues) {
      item.itemValues = chartConfig.itemValues.map((value) =>
        parseInt(value.key ? `${(item as unknown as Hash)[value.key]}` : '0')
      )
    }
    if (chartConfig.axisKeys && !item.itemLabel) {
      item.itemLabel = (item as unknown as Hash)[chartConfig.axisKeys[0]]
    }
    return item
  })
}

// Add random colours to a chart config
export const addColoursToConfig = (itemValues: ConfigItemValue[]) => {
  return itemValues.map((value) => {
    value.color ??= getRandomColor().formatHex()
    return value
  })
}
