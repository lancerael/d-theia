var getPromiseJSON = Theia.getUtilities().getPromiseJSON;

var aDummyData = [
  { 'redItem': 4, 'blueItem': 6, 'greenItem': 5, 'label': 'First' },
  { 'redItem': 7, 'blueItem': 8, 'greenItem': 9, 'label': 'Second' },
  { 'redItem': 3, 'blueItem': 2, 'greenItem': 1, 'label': 'Third' }
];

/* Display dummy bar chart */
Theia.createBarChart({
  sContainer: 'container-bar-test',
  jConfig: Config.jTestConfig,
  aData: aDummyData,
});

/* Display dummy line chart */
Theia.createLineChart({
  sContainer: 'container-line-test',
  jConfig: Config.jTestConfig,
  aData: aDummyData,
});

/*
 Display a bar chart, line chart and bubble chart from a subsection
 of retrieved data.
*/
getPromiseJSON('./data/cycles.json').then( function(data) {
  var aCycleData = Theia.getDataOps().sliceSampleData(data.stationBeanList, 15);
  Theia.createBarChart({
	  sContainer: 'container-bar-1',
    jConfig: Config.jAxisConfig1,
    aData: aCycleData,
  });
  Theia.createLineChart({
	  sContainer: 'container-line-1',
    jConfig: Config.jAxisConfig1,
    aData: aCycleData,
  });
  Theia.createBubbleChart({
    sContainer: 'container-bubble-1',
    jConfig: Config.jBubbleConfig1,
    aData: aCycleData,
  });
});

/*
 Display a bar chart from retrieved and transfromed data.
*/
getPromiseJSON('./data/formula1.json').then( function(data) {
  Theia.createBarChart({
    sContainer: 'container-bar-2',
    jConfig: Config.jBarConfig2,
    aData: (() => {
      var aData = [];
      data.MRData.RaceTable.Races[0].Results.forEach(function(jItem) {
        aData.push({
          aValues: [parseInt(jItem.points) + 5, jItem.position],
          sLabel: jItem.Driver.givenName + ' ' + jItem.Driver.familyName
        });
      });
      return aData;
    })()
  });
});
