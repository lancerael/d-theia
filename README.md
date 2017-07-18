# dTheia v1.0.0
dTheia is a reusable charting library built using d3 v.4 and ES6. Code is transpiled into ES5 for distribution. The aim of this project is to provide a simple API for the creation of D3 charts within any client side framework.

Current available charts:
- Bar chart
- Line chart
- Bubble Chart

The library is purely JavaScript but does include a simple app and associated HTML/CSS for demonstration and development.
Demo App: http://79.170.40.52/ui-dev.lt/d-theia/
- Shows randomised cycle docking station data.
- Refresh page for new random data:
-- bar chart
-- line chart
-- bubble chart.
- Secondary bar chart shows race data.
- Responsive design (resize browser window)

Usage:

For non-Node projects simply include dist/d-theia.min.js in your project.

If you are using Node, install ass follows:

```npm install d-theia```

You can then instantiate a new chart by supplying:
- sContainer - the ID of (or oContainer - DOM reference to) a container node.
- jConfig - a JSON configuration object - see examples in demo/config.js
- aData - Chart data array - see examples in demo/data

```
Theia.create[Bar/Line/Bubble]Chart({
  sContainer: 'container-bar-1',  // ID of target DOM element
  jConfig: jConfig1, // Chart config
  aData: aData1 // Chart data
});
```

Chart creation methods:
* createBarChart
* createLineChart
* createBubbleChart

Dev Installation:

Install Node.JS (https://nodejs.org/) and NPM:
```npm install npm -g```

Navigate to folder and install app:
```npm install```

You can then use NPM to manage project tasks:

TESTING (Uses Karma to run Jasmine TDD tests and generate code coverage - watcher):
```npm run test```

DEV SERVER (Uses Webpack/Babel with plugins, performs linting on build - watcher):
```npm run serve```
You can then access the server at http://localhost:8081 which launches the contents of the demo folder.

BUILD DISTRIBUTION:
```npm run dist```


API Documentation: http://79.170.40.52/ui-dev.lt/d-theia/documentation/

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

Technologies Used:

- NodeJS/NPM
- OOP JavaScript ES2015 (ES6)
- d3 v4
- Babel/Webpack
- TDD Jasmine/Karma
- YUIDoc

TDD Unit tests:

- 29 tests cover all available classes.
- More tests to be added on completion of code coverage reporting.

In progress:

- Colour range key.
- Implement TDD code coverage reporting.
- Evaluate Functional Programming enhancements.
- Create React and Angular 2 sandbox environments.
