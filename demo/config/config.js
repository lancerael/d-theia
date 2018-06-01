const Config = {

  jAxisConfig1: {
    sTitle: 'Bike Docking Stations by Street',
    aValues: [
      {
        sKey: 'totalDocks',
        sName: 'Total Docks',
        sColour: '#204787',
      },
      {
        sKey: 'availableDocks',
        sName: 'Available Docks',
        sColour: '#9aa4bc',
      },
      {
        sKey: 'availableBikes',
        sName: 'Available Bikes',
        sColour: '#aa1b76',
      },
      {
        sKey: 'statusKey',
        sName: 'Faulty Bikes',
        sColour: 'red',
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

  jBarConfig2: {
    sTitle: 'Race Results by Driver',
    aValues: [
      { sName: 'Position', sColour: 'green' },
      { sName: 'Points', sColour: 'blue' }
    ],
    aAxisLabels: ['Position / Points', 'Driver Name'],
    sBarType: 'side', // "stack","nest"
    iTruncate: 15
  },

  jBubbleConfig1: {
    sTitle: 'Bike Docking Stations by Availability',
    aValues: [
      {
        sKey: 'totalDocks',
        sName: 'Total Docks'
      },
      {
        sKey: 'availableBikes',
        sName: 'Available Bikes',
        aColours: ['red', '#aa1b76']
      },
    ],
    aAxisKeys: ['stationName'],
    aAxisLabels: ['Sized by Total Docks', 'Coloured by Available Bikes']
  }

}
