# d-theia
dTheia is a reusable charting library built using d3 v.4 and ES6. Code is transpiled into ES5 for distribution. The aim of this project is to provide a simple API for the creation of D3 charts within any client side framework. A secondary aim is an academic analysis of pros/cons of class based OOP JavaScript functionality provided with ES6, compared with a Functional Programming paradigm.

Current available charts:
- Bar chart
- Line chart
- Bubble Chart

The library is purely JavaScript but does include a simple app and associated HTML/CSS for demonstration and development.
Demo App: http://79.170.40.52/ui-dev.lt/d-theia/
- Shows randomised cycle docking station data as
-- bar chart
-- line chart
-- bubble chart.
- Secondary bar chart shows race data.
- Responsive design (resize browser window)

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

The limitations of this approach have been demonstrated. The class based heirarchy has presented an easily understood structure, but different types of chart cannot be easily combined. The code is now being refactored for a Functional Programming approach.

Technologies Used:
- NodeJS/NPM
- OOP JavaScript ES2015 (ES6)
- d3 v4
- Babel/Webpack
- TDD Jasmine/Karma
- YUIDoc

In progress:

- Implement TDD code coverage reporting.
- Colour range key.
- Functional Programming refactor.

Installation:

Install Node.JS (https://nodejs.org/) and NPM:
* npm install npm -g

Navigate to folder and install app:
* npm install

You can then use NPM to manage project tasks:

TESTING (Uses Karma to run Jasmine TDD tests and generate code coverage - watcher):
- npm run test

DEV SERVER (Uses Webpack/Babel with plugins, performs linting on build - watcher):
- npm run serve

BUILD DISTRIBUTION:
- npm run dist
