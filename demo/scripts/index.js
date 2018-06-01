const Utilities = Theia.getUtilities();
let jTest = Utilities.getRandomData();

/* Display dummy bar chart */
Theia.chart('container-bar-test', 'bar', jTest);

/* Display dummy line chart */
Theia.chart('container-line-test', 'line', jTest);

/*
 Display a bar chart, line chart and bubble chart from a subsection
 of retrieved data.
*/
Utilities.getPromiseJSON('./data/cycles.json').then((data) => {
  const aCycleData = Utilities.sliceSampleData(data.stationBeanList, 15);
  const jCycleTest = {
    jConfig: Config.jAxisConfig1,
    aData: aCycleData,
  };
  Theia.chart('container-bar-1', 'bar', jCycleTest);
  Theia.chart('container-line-1', 'line', jCycleTest);
  Theia.chart('container-bubble-1', 'bubble', {...jCycleTest, jConfig: Config.jBubbleConfig1});
});

/*
 Display a bar chart from retrieved and transfromed data.
*/
Utilities.getPromiseJSON('./data/formula1.json').then((data) => {
  Theia.chart('container-bar-2', 'bar', {
    jConfig: Config.jBarConfig2,
    aData: data.MRData.RaceTable.Races[0].Results.map((jItem) => {
      return {
        aValues: [jItem.position, parseInt(jItem.points) + 5],
        sLabel: `${jItem.Driver.givenName} ${jItem.Driver.familyName}`
      }
    })
  });
});

/*
  Refresh the page with random data unless user cancels
*/
let iCoundown = 9;
let reloadTimeout = setTimeout(() => window.location.reload(), 10000);
let reloadInterval = setInterval(() => document.querySelector('#message strong').innerHTML = iCoundown--, 1000);
function stopReload(e) {
  clearTimeout(reloadTimeout);
  clearInterval(reloadInterval);
  e.preventDefault();
  document.querySelector('#message').style.visibility = 'hidden';
}
document.querySelector('#message a').addEventListener('click', stopReload);
