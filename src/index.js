const BarChart = require('./components/bar-chart.js');
const BubbleChart = require('./components/bubble-chart.js');
const Utilities = require('./components/utilities.js');
const Config = require('./config.js');

const aBarCharts = [];
const aBubbleCharts = [];

/*
 Display a bar chart and corresponding bubble chart from a subsection
 of retrieved data.
*/
Utilities.getPromiseJSON('./data/cycles.json').then((data) => {
  const aCycleData = Utilities.sliceSampleData(data.stationBeanList, 10);
  aBarCharts.push(new BarChart({
    oContainer: document.getElementById('container-bar-1'),
    jConfig: Config.jBarConfig1,
    aData: aCycleData,
  }).init());
  aBubbleCharts.push(new BubbleChart({
    oContainer: document.getElementById('container-bubble-1'),
    jConfig: Config.jBubbleConfig1,
    aData: aCycleData,
  }).init());
});

/*
 Display a bar chart from retrieved and transfromed data.
*/
Utilities.getPromiseJSON('./data/formula1.json').then((data) => {
  aBarCharts.push(new BarChart({
    oContainer: document.getElementById('container-bar-2'),
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
