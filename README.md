# d-theia
dTheia is a reusable charting library built using d3 v.4 and ES6 

Demo App: http://79.170.40.52/ui-dev.lt/d-theia/
- Shows randomised cycle docking station data as bar chart and bubble chart.
- Secondary bar chart shows race data.
- Responsive design (try resizing)

API Documentation: http://79.170.40.52/ui-dev.lt/d-theia/documentation/

This module provides the following classes:

- Theia - chart parent object
- BarChart
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

In progress:

- Implement TDD code coverage reporting.
- Colour range key.
- Line chart.

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
