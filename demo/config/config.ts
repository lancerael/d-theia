export default {
  jAxisConfig1: {
    sTitle: 'Bike Docking Stations by Street',
    aValues: [
      {
        sKey: 'totalDocks',
        sName: 'Total Docks',
        sColor: '#204787',
      },
      {
        sKey: 'availableDocks',
        sName: 'Available Docks',
        sColor: '#9aa4bc',
      },
      {
        sKey: 'availableBikes',
        sName: 'Available Bikes',
        sColor: '#aa1b76',
      },
      {
        sKey: 'statusKey',
        sName: 'Faulty Bikes',
        sColor: 'red',
      },
    ],
    aAxisKeys: ['stationName'],
    aAxisLabels: ['Docks / Bikes', 'Station Locations'],
    sBarType: 'side', // "stack","nest"
    iTruncate: 15,
    /*
    fnClickCallback: ({ oEvent, jData, sKey }) => {
      console.log('Click Callback');
      console.log(oEvent);
      console.log(jData);
      console.log(sKey);
    },
    */
  },

  jBubbleConfig1: {
    sTitle: 'Bike Docking Stations by Availability',
    aValues: [
      {
        sKey: 'totalDocks',
        sName: 'Total Docks',
      },
      {
        sKey: 'availableBikes',
        sName: 'Available Bikes',
        aColors: ['red', '#aa1b76'],
      },
    ],
    aAxisKeys: ['stationName'],
    aAxisLabels: ['Sized by Total Docks', 'Coloured by Available Bikes'],
  },

  jBarConfig2: {
    sTitle: 'Race Results by Driver',
    aValues: [
      { sName: 'Position', sColor: 'green' },
      { sName: 'Points', sColor: 'blue' },
    ],
    aAxisLabels: ['Position / Points', 'Driver Name'],
    sBarType: 'side', // "stack","nest"
    iTruncate: 15,
  },
} as any
