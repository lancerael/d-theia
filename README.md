# dTheia v2.0.1

dTheia is a JavaScript charting library for visualization of complex data.

## Overview

Built using d3 and ES6. Code is transpiled into ES5 for distribution.
The aim of this project is to provide a simple API for the creation of D3 charts within any client side framework.
Charts are responsive in any device, providing additional detail via hover/touch tooltips.

- Bar chart
- Line chart
- Bubble Chart

## Source

- GitHub - http://www.github.com/lancerael/d-theia
- NPM - https://www.npmjs.com/package/d-theia

## Demo

The library is purely JavaScript but does include a simple app and associated HTML/CSS for demonstration and development.

### Demo App

http://dtheia.org/demo

- Shows basic dummy bar and line charts.
- Shows randomised cycle docking station data as bar, line and bubble.
- Refresh page for new random data.
- Another line chart shows race data.

### React demo App

There is a separate repository in progress, using React to create a sandbox app for dTheia.

d-theia-react-app - https://github.com/lancerael/d-theia-sandbox-react

## Installation

You can include dTheia in your project as an NPM module, or you can check out the code and compile yourself.

### Install in Node projects

If you are using Node, install as follows:

```$npm install d-theia```

Import the module into your code:

```import Theia from 'd-theia';```

### Installing locally

For standalone projects you can build and include dist JS files in your project.

 - ./dist/d-theia.min.js - minified library
 - ./dist/d-theia.vendor.min.js - vendor (d3)

Install Node.JS (https://nodejs.org/) and NPM:

```$npm install npm -g```

Navigate to folder and install app:

```$npm install```

### NPM tasks

You can then use NPM to manage project tasks.

#### BUILD

To generate the minified files run the build task:

```$npm run dist```


#### TEST
Uses Karma to run Jasmine TDD tests (watcher)

```npm run test```

#### DEV SERVER
Uses Webpack/Babel with plugins, performs linting on build (watcher)

```npm run serve```

You can then access the server at http://localhost:8081 which launches the contents of the demo folder.

## Displaying charts

You can instantiate a new chart by calling the appropriate method and supplying:
- sContainer - the ID of (or dContainer - DOM reference to) a container node.
- jConfig - a JSON configuration object - see examples in demo/config
- aData - Chart data array - see examples in demo/data

```
Theia.create[Bar/Line/Bubble]Chart({
  sContainer: 'container-bar-1',  // ID of target DOM element
  jConfig, // Chart config
  aData // Chart data
});
```

...or shorthand...

```
Theia.chart( 'container-bar-1', 'bar', {jConfig, aData} );
```

Either method will return a dTheia chart object for you to further manipulate as required.

### Data

Data can be randomly generated, or loaded from a HTTP endpoint. When loading from an endpoint you have the choice of
using specially constructed JSON chart data, or mapping any JSON structure from the response using the config.

The default structure for the chart is an array of objects, each containing:
- a label string
- an array of integer values

```
[
  {"sLabel":"Item 1","aValues":[114,54,159]},
  {"sLabel":"Item 2","aValues":[102,115,70]},
  {"sLabel":"Item 3","aValues":[82,146,59]},
  {"sLabel":"Item 4","aValues":[90,138,113]}
]
```

For unmodified endpoints with labels and values on other keys, you can map them using the config as shown below.  

### Config

The config contains the basic info about how to display the chart. It contains:

- sTitle - a string denoting the title of the charts
- aAxisLabels - an array containing the x and y axis labels
- aValues - an array of key values each with a name for its label and a HEX colour string
- bTrim - optionally you can trim/pad the extremes of the chart for aethetic

```
{
  "sTitle":"Random Chart Data",
  "aAxisLabels":["Y Axis","X Axis"],
  "aValues":[
    {"sName":"Type 1","sColor":"#3f09e5"},
    {"sName":"Type 2","sColor":"#1e6b7b"},
    {"sName":"Type 3","sColor":"#adb9dc"}],
  "bTrim":true
}
```

If you are mapping another data structure from a JSON endpoint, eg:

```[{ k1: 4, k2: 5, k3: 'six' }, { k1: 7, k2: 8, k3: 'nine' }]```

You would provide an array of keys for the axis, and additional sKey parameter with each value for mapping.

```
{
  aAxisKeys: ['k3'],
  aAxisLabels: ['y', 'x'],
  aValues: [
    {
      sKey: 'k1',
      sName: 'K1',
      sColour: 'red',
    },
    {
      sKey: 'k2',
      sName: 'K2',
      sColour: 'blue',
    }
  ]
}
```

## API Documentation

http://www.dtheia.org/

This module provides the following ES6 classes:

- Theia - static chart parent object an main api
- Chart - parent class for all types of chart
- AxisChart - parent class for types of axis chart
- BarChart - class for bar charts
- LineChart class for line chart
- BubbleChart - class for bubble chart
- Axis - class for x/y axes and labels
- Key - class for colour coded key
- Tooltip - class for helper for displaying data on mouseover
- Utilities - static helper methods
- DataOps - static data operations

### Variable Naming

All variables use camel case. Classes have no prefix.
All other types of variables use prefixes for a Hungarian style of notation.
This allows easier learning of the code and faster debugging, particularly when
identifying different kinds of objects.

#### Simple Native JS

- s String
- i integer Number
- f float Number
- n Number (for unknown i/f)
- b Boolean
- m mixed or unknown

#### Arrays

- a Array - numerical array
- h Hash table - an object used as an associative array with key/value pairs

#### Objects

- o Object any kind of JavaScript Object with properties and methods
- j JSON a JavaScript Object that is a pure data structure safe to stringify or load from endpoint
- d DOM object, a reference to a specific DOM node
- d3 a d3 collection object

## Technologies Used

- NodeJS/NPM
- OOP JavaScript ES2015 (ES6)
- d3 v4
- Babel/Webpack
- TDD Jasmine/Karma
- YUIDoc

## TDD Unit tests

- 29 tests cover all available classes.
