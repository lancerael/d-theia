# dTheia v1.2.1

dTheia is a reusable charting library

## Overview

Built using d3 and ES6. Code is transpiled into ES5 for distribution.
The aim of this project is to provide a simple API for the creation of D3 charts within any client side framework.

## Current available charts

- Bar chart
- Line chart
- Bubble Chart

## Demo

The library is purely JavaScript but does include a simple app and associated HTML/CSS for demonstration and development.

### Demo App

http://79.170.40.52/ui-dev.lt/d-theia/

- Shows basic dummy bar and line charts.
- Shows randomised cycle docking station data.
- Refresh page for new random sections of data:
-- bar chart
-- line chart
-- bubble chart.
- Another bar chart shows race data.
- Responsive design (resize browser window)

### React demo App

There is a separate repository in progress, using React to create a sandbox app.

d-theia-react-app - https://github.com/lancerael/d-theia-sandbox-react

## Usage

You can include dTheia in your project as an NPM module, or you can check out the code and compile yourself. Choose one of these methods then follow the examples below to instantiate charts in your app.

### Using in Node projects

If you are using Node, install as follows:

```npm install d-theia```

Import the module into your code:

```import * as Theia from 'd-theia';```

### Installing locally

For standalone projects you must build and include dist JS files in your project.

 - ./dist/d-theia.min.js - minified library
 - ./dist/d-theia.vendor.min.js - vendor (d3)

Install Node.JS (https://nodejs.org/) and NPM:

```npm install npm -g```

Navigate to folder and install app:

```npm install```

You can then use NPM to manage project tasks.

To generate the minified files run the build task:

```npm run dist```

### Displaying charts

You can then instantiate a new chart by supplying:
- sContainer - the ID of (or dContainer - DOM reference to) a container node.
- jConfig - a JSON configuration object - see examples in demo/config
- aData - Chart data array - see examples in demo/data

```
Theia.create[Bar/Line/Bubble]Chart({
  sContainer: 'container-bar-1',  // ID of target DOM element
  jConfig: jConfig1, // Chart config
  aData: aData1 // Chart data
});
```

...or shorthand...

```
Theia.chart( 'container-bar-1', 'bar', {jConfig, aData} );
```

## Other NPM tasks

#### TESTING
Uses Karma to run Jasmine TDD tests and generate code coverage (watcher)

```npm run test```

#### DEV SERVER
Uses Webpack/Babel with plugins, performs linting on build (watcher)

```npm run serve```

You can then access the server at http://localhost:8081 which launches the contents of the demo folder.

## API Documentation

http://79.170.40.52/ui-dev.lt/d-theia/documentation/

This module provides the following ES6 classes:

- Theia - chart parent object
- AxisChart - parent for axis types of chart
- BarChart
- LineChart
- BubbleChart
- Axis - reusable x/y ages and labels
- Key - reusable colour coded key
- Tooltip - reusable tooltip
- Utilities - helper methods

## Technologies Used

- NodeJS/NPM
- OOP JavaScript ES2015 (ES6)
- d3 v4
- Babel/Webpack
- TDD Jasmine/Karma
- YUIDoc

## TDD Unit tests

- 29 tests cover all available classes.
