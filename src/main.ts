//@ts-nocheck

import Theia, { getRandomData, sliceSampleData } from './'
import Config from '../demo/config/config'

import cycleData from '../demo/data/cycles.json'
import racingData from '../demo/data/formula1.json'

let jTest = getRandomData()

// console.log(jTest)

// Display dummy bar chart
const barChart = Theia.chart('container-bar-test', 'bar', jTest)

// Display dummy line chart
const lineChart = Theia.chart('container-line-test', 'line', jTest)

// Display a bar chart, line chart and bubble chart from a subsection of retrieved data.
const aCycleData = sliceSampleData(cycleData.stationBeanList, 15)
const jCycleTest = {
  chartConfig: Config.jAxisConfig1,
  chartData: aCycleData,
  doTransform: true,
}
Theia.chart('container-bar-1', 'bar', jCycleTest)
Theia.chart('container-line-1', 'line', jCycleTest)
Theia.chart('container-bubble-1', 'bubble', {
  ...jCycleTest,
  chartConfig: Config.jBubbleConfig1,
})

// Display a bar chart from retrieved and transfromed data.
Theia.chart('container-bar-2', 'line', {
  chartConfig: Config.jBarConfig2,
  chartData: racingData.MRData.RaceTable.Races[0].Results.map((jItem) => {
    return {
      itemValues: [parseInt(jItem.position), parseInt(jItem.points)],
      itemLabel: `${jItem.Driver.givenName} ${jItem.Driver.familyName}`,
    }
  }),
})

// // Show updating of chart data
setTimeout(() => {
  jTest.chartData[0].itemValues[0] = 100
  barChart.updateData(jTest.chartData)
  lineChart.updateData(jTest.chartData)
}, 1000)

// Show updating of chart config
setTimeout(() => {
  jTest.chartConfig.doTrim = false
  barChart.updateConfig(jTest.chartConfig)
  lineChart.updateConfig(jTest.chartConfig)
}, 2000)

let popped: any

// Show removal of data row
setTimeout(() => {
  popped = jTest.chartData.pop()
  barChart.updateData(jTest.chartData)
  lineChart.updateData(jTest.chartData)
}, 3000)

// Show addition of data row
setTimeout(() => {
  jTest.chartData.push(popped)
  barChart.updateData(jTest.chartData)
  lineChart.updateData(jTest.chartData)
}, 4000)

// Show removal of data column
setTimeout(() => {
  const newData = structuredClone(jTest.chartData).map(
    ({ itemLabel, itemValues }) => ({
      itemLabel,
      itemValues: itemValues.slice(0, -1),
    })
  )
  let newConfig = structuredClone(jTest.chartConfig)
  newConfig = {
    ...newConfig,
    itemValues: newConfig.itemValues.slice(0, -1),
  }
  barChart.updateData(newData)
  barChart.updateConfig(newConfig)
  lineChart.updateData(newData)
  lineChart.updateConfig(newConfig)
}, 5000)

// Show addition of data column
setTimeout(() => {
  barChart.updateData(jTest.chartData)
  barChart.updateConfig(jTest.chartConfig)
  lineChart.updateData(jTest.chartData)
  lineChart.updateConfig(jTest.chartConfig)
}, 6000)
