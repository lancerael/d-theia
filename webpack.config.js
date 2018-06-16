var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
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
        exclude: [/dist/],
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
          failOnError: true,
        },
      },
    }),
    //new UglifyJSPlugin(),
    //new BundleAnalyzerPlugin({
    //  analyzerMode: 'static'
    //}),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'node-static',
      filename: 'vendor.js',
      minChunks(module) {
        var context = module.context;
        return context && context.indexOf('node_modules') >= 0;
      }
    })
  ],
  devServer: {
    contentBase: './demo'
  }
};
