module.exports = (config) => {
  config.set({
    browsers: ['PhantomJS'],
    files: [
      { pattern: 'test-context.js', watched: false },
      './node_modules/phantomjs-polyfill-object-assign/object-assign-polyfill.js',
      './node_modules/babel-polyfill/dist/polyfill.js'
    ],
    frameworks: ['jasmine'],
    reporters: ['progress', 'coverage'],
    preprocessors: {
      'test-context.js': ['webpack', 'coverage'],
    },
    webpack: {
      module: {
        loaders: [
                    { test: /\.js/, exclude: /node_modules/, loader: 'babel-loader' },
        ],
      },
      watch: true,
    },
    webpackServer: {
      noInfo: true,
    },
    coverageReporter: {
      type: 'html',
      dir: 'coverage/',
    },
  });
};
