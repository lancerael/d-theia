export default {
  jAxisConfig1: {
    title: 'Bike Docking Stations by Street',
    itemValues: [
      {
        key: 'totalDocks',
        name: 'Total Docks',
        color: '#204787',
      },
      {
        key: 'availableDocks',
        name: 'Available Docks',
        color: '#9aa4bc',
      },
      {
        key: 'availableBikes',
        name: 'Available Bikes',
        color: '#aa1b76',
      },
      {
        key: 'statusKey',
        name: 'Faulty Bikes',
        color: 'red',
      },
    ],
    axisKeys: ['stationName'],
    axisLabels: ['Docks / Bikes', 'Station Locations'],
    sBarType: 'side', // "stack","nest"
    truncateSize: 13,
    padding: { l: 45, r: 15, t: 25, b: 80 },
    /*
    fnClickCallback: ({ oEvent, jData, key }) => {
      console.log('Click Callback');
      console.log(oEvent);
      console.log(jData);
      console.log(key);
    },
    */
  },

  jBubbleConfig1: {
    title: 'Bike Docking Stations by Availability',
    itemValues: [
      {
        key: 'totalDocks',
        name: 'Total Docks',
      },
      {
        key: 'availableBikes',
        name: 'Available Bikes',
        colors: ['red', '#aa1b76'],
      },
    ],
    axisKeys: ['stationName'],
    axisLabels: ['Sized by Total Docks', 'Coloured by Available Bikes'],
  },

  jBarConfig2: {
    title: 'Race Results by Driver',
    itemValues: [
      { name: 'Position', color: 'green' },
      { name: 'Points', color: 'blue' },
    ],
    axisLabels: ['Position / Points', 'Driver Name'],
    sBarType: 'side', // "stack","nest"
    truncateSize: 15,
    padding: { l: 45, r: 15, t: 25, b: 80 },
  },
} as any
