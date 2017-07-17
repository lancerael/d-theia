const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/components/theia.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'd-theia.min.js',
    library: 'Theia'
  },
  module: {
    loaders: [
      {
        enforce: 'pre',
        test: /\.js?$/,
        loader: 'eslint-loader',
        exclude: [/node_modules/, /dist/],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['env'],
          plugins: ['transform-class-properties'],
        },
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          failOnWarning: false,
          failOnError: false,
        },
      },
    }),
    new UglifyJSPlugin()
  ],
};
