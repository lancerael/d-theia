import Theia, { getRandomData, sliceSampleData } from './'
import Config from '../demo/config/config'

import cycleData from '../demo/data/cycles.json'
import racingData from '../demo/data/formula1.json'

let jTest = getRandomData()

// Display dummy bar chart
const chart = Theia.chart('container-bar-test', 'bar', jTest)

// Display dummy line chart
Theia.chart('container-line-test', 'line', jTest)

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

// Show updating of chart data
setTimeout(() => {
  jTest.chartData[0].itemValues[0] = 100
  chart.updateData(jTest.chartData)
}, 2000)

// Show updating of chart config
setTimeout(() => {
  jTest.chartConfig.doTrim = false
  chart.updateConfig(jTest.chartConfig)
}, 5000)
