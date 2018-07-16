const getPromiseJSON = Theia.getUtilities().getPromiseJSON;
const DataOps = Theia.getDataOps();
let jTest = DataOps.getRandomData();

// Display dummy bar chart
Theia.chart('container-bar-test', 'bar', jTest);

// Display dummy line chart
Theia.chart('container-line-test', 'line', jTest);

// Display a bar chart, line chart and bubble chart from a subsection of retrieved data.
getPromiseJSON('./data/cycles.json').then((data) => {
  const aCycleData = DataOps.sliceSampleData(data.stationBeanList, 15);
  const jCycleTest = {
    jConfig: Config.jAxisConfig1,
    aData: aCycleData,
  };
  Theia.chart('container-bar-1', 'bar', jCycleTest);
  Theia.chart('container-line-1', 'line', jCycleTest);
  Theia.chart('container-bubble-1', 'bubble', {...jCycleTest, jConfig: Config.jBubbleConfig1});
});

// Display a bar chart from retrieved and transfromed data.
getPromiseJSON('./data/formula1.json').then((data) => {
  Theia.chart('container-bar-2', 'line', {
    jConfig: Config.jBarConfig2,
    aData: data.MRData.RaceTable.Races[0].Results.map((jItem) => {
      return {
        aValues: [parseInt(jItem.position), parseInt(jItem.points)],
        sLabel: `${jItem.Driver.givenName} ${jItem.Driver.familyName}`
      }
    })
  });
});
