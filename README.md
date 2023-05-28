# dTheia

dTheia is a JavaScript charting library for visualization of complex data.

## Overview

Built using d3 and ES6. A simple API for the creation of D3 charts within any client side framework.
Charts are responsive in any device, providing additional detail via hover/touch tooltips.

- Bar chart
- Line chart
- Bubble Chart

## Source

- GitHub - http://www.github.com/lancerael/d-theia
- NPM - https://www.npmjs.com/package/d-theia

## Demo

The library is pure JavaScript but does include a simple app and associated HTML/CSS for demonstration and development.

### Demo App

http://dtheia.org/demo

- Shows basic dummy bar and line charts.
- Shows randomised cycle docking station data as bar, line and bubble.
- Refresh page for new random data.
- Another line chart shows race data.

### React demo App

There is a separate sandbox app for dTheia.

sandbox-react-demo - http://dtheia.org/sandbox-react-demo/

## Installation

Recommended to use `PNPM` for tasks and contribution.

Install `pnpm add d-theia`

Import into TS projects - `import Theia from 'd-theia'`

Or vanilla projects - `import Theia from 'd-theia/vanilla'`

### Contribution

If you want to work with the code...

#### DEV SERVER

Uses Vite for ESM dev server:

`pnpm dev`

You can then access the server at http://localhost:5173 which launches the contents of the demo folder.

#### BUILD

To generate the minified files:

`pnpm build`

#### TEST

Uses Vitest to run TDD tests:

`pnpm test`

## Displaying charts

You can instantiate a new chart by calling the appropriate method and supplying:

- `containerId` - the ID of (or container - DOM reference to) a container node.
- `chartConfig` - a JSON configuration object - see examples in demo/config
- `chartData` - Chart data array - see examples in demo/data

```
Theia.create[Bar/Line/Bubble]Chart({
  containerId: 'container-bar-1',  // ID of target DOM element
  chartConfig, // Chart config
  chartData // Chart data
});
```

...or shorthand...

```
Theia.chart( 'container-bar-1', 'bar', {chartConfig, chartData} );
```

Either method will return a dTheia chart object for you to further manipulate as required.

### Data

Data can be randomly generated, or loaded from a HTTP endpoint. When loading from an endpoint you have the choice of
using specially constructed JSON chart data, or mapping any JSON structure from the response using the config.

The default structure for the chart is an array of objects, each containing:

- `itemLabel` - a label string
- `itemValues` - an array of integer values

```
[
  {"itemLabel":"Item 1","itemValues":[114,54,159]},
  {"itemLabel":"Item 2","itemValues":[102,115,70]},
  {"itemLabel":"Item 3","itemValues":[82,146,59]},
  {"itemLabel":"Item 4","itemValues":[90,138,113]}
]
```

For unmodified endpoints with labels and values on other keys, you can map them using the config as shown below.

### Config

The config contains the basic info about how to display the chart. It contains:

- `title` - a string denoting the title of the charts
- `axisLabels` - an array containing the x and y axis labels
- `itemValues` - an array of key values each with a name for its label and a HEX colour string
- `doTrim` - optionally you can trim/pad the extremes of the chart for aethetic

```
{
  "title":"Random Chart Data",
  "axisLabels":["Y Axis","X Axis"],
  "itemValues":[
    {"name":"Type 1","color":"#3f09e5"},
    {"name":"Type 2","color":"#1e6b7b"},
    {"name":"Type 3","color":"#adb9dc"}],
  "doTrim":true
}
```

If you are mapping another data structure from a JSON endpoint, eg:

`[{ k1: 4, k2: 5, k3: 'six' }, { k1: 7, k2: 8, k3: 'nine' }]`

You would provide an array of keys for the axis, and additional key parameter with each value for mapping.

```
{
  axisKeys: ['k3'],
  axisLabels: ['y', 'x'],
  itemValues: [
    {
      key: 'k1',
      name: 'K1',
      color: 'red',
    },
    {
      key: 'k2',
      name: 'K2',
      color: 'blue',
    }
  ]
}
```

## API Documentation

http://www.dtheia.org/

This module provides the following ES classes:

- `Theia` - static chart parent object an main api
- `Chart` - parent class for all types of chart
- `AxisChart` - parent class for types of axis chart
- `BarChart` - class for bar charts
- `LineChart` class for line chart
- `BubbleChart` - class for bubble chart
- `Axis` - class for x/y axes and labels
- `Key` - class for colour coded key
- `Tooltip` - class for helper for displaying data on mouseover
- `Utilities` - static helper methods
- `DataOps` - static data operations

## Technologies Used

- TypeScript
- PNPM
- d3
- Vite
- Vitest
- YUIDoc
