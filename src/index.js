const BarChart = require('./components/bar-chart.js');
const LineChart = require('./components/line-chart.js');
const BubbleChart = require('./components/bubble-chart.js');
const Utilities = require('./components/utilities.js');
const Config = require('./config.js');

const aBarCharts = [];
const aLineCharts = [];
const aBubbleCharts = [];

/*
 Display a bar chart, line chart and bubble chart from a subsection
 of retrieved data.
*/
Utilities.getPromiseJSON('./data/cycles.json').then((data) => {
  const aCycleData = Utilities.sliceSampleData(data.stationBeanList, 15);
  const jAxis = {
    jConfig: Config.jAxisConfig1,
    aData: aCycleData,
  };
  aBarCharts.push(new BarChart(Object.assign({ sContainer: 'container-bar-1' }, jAxis)).init());
  aLineCharts.push(new LineChart(Object.assign({ sContainer: 'container-line-1' }, jAxis)).init());
  aBubbleCharts.push(new BubbleChart({
    sContainer: 'container-bubble-1',
    jConfig: Config.jBubbleConfig1,
    aData: aCycleData,
  }).init());
});

/*
 Display a bar chart from retrieved and transfromed data.
*/
Utilities.getPromiseJSON('./data/formula1.json').then((data) => {
  aBarCharts.push(new BarChart({
    sContainer: 'container-bar-2',
    jConfig: Config.jBarConfig2,
    aData: (() => {
      const aData = [];
      for (const jItem of data.MRData.RaceTable.Races[0].Results) {
        aData.push({
          points: parseInt(jItem.points) + 5,
          position: jItem.position,
          name: `${jItem.Driver.givenName} ${jItem.Driver.familyName}`
        });
      }
      return aData;
    })()
  }).init());
});
