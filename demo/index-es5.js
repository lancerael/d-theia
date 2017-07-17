var Utilities = Theia.getUtilities();

/*
 Display a bar chart, line chart and bubble chart from a subsection
 of retrieved data.
*/
Utilities.getPromiseJSON('./data/cycles.json').then( function(data) {
  var aCycleData = Utilities.sliceSampleData(data.stationBeanList, 15);
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
Utilities.getPromiseJSON('./data/formula1.json').then( function(data) {
  Theia.createBarChart({
    sContainer: 'container-bar-2',
    jConfig: Config.jBarConfig2,
    aData: (() => {
      var aData = [];
      data.MRData.RaceTable.Races[0].Results.forEach(function(jItem) {
        aData.push({
          points: parseInt(jItem.points) + 5,
          position: jItem.position,
          name: jItem.Driver.givenName + ' ' + jItem.Driver.familyName
        });
      });
      return aData;
    })()
  });
});
