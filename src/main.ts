import Theia from './'
import Config from '../demo/config/config'

import cycleData from '../demo/data/cycles.json'
import racingData from '../demo/data/formula1.json'

const DataOps = Theia.getDataOps()
let jTest = DataOps.getRandomData()

// Display dummy bar chart
const chart = Theia.chart('container-bar-test', 'bar', jTest)

// Display dummy line chart
Theia.chart('container-line-test', 'line', jTest)

// Display a bar chart, line chart and bubble chart from a subsection of retrieved data.
const aCycleData = DataOps.sliceSampleData(cycleData.stationBeanList, 15)
const jCycleTest = {
  jConfig: Config.jAxisConfig1,
  aData: aCycleData,
  bTransform: true,
}
Theia.chart('container-bar-1', 'bar', jCycleTest)
Theia.chart('container-line-1', 'line', jCycleTest)
Theia.chart('container-bubble-1', 'bubble', {
  ...jCycleTest,
  jConfig: Config.jBubbleConfig1,
})

// Display a bar chart from retrieved and transfromed data.
Theia.chart('container-bar-2', 'line', {
  jConfig: Config.jBarConfig2,
  aData: racingData.MRData.RaceTable.Races[0].Results.map((jItem) => {
    return {
      aValues: [parseInt(jItem.position), parseInt(jItem.points)],
      sLabel: `${jItem.Driver.givenName} ${jItem.Driver.familyName}`,
    }
  }),
})

// Show updating of chart data
setTimeout(() => {
  jTest.aData[0].aValues[0] = 100
  chart.updateData(jTest.aData)
}, 2000)
