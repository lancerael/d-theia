const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const webpack = require('webpack');
const ShakePlugin = require('webpack-common-shake').Plugin;
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = env => {
  const config = {
    entry: './src/theia.js',
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
      })
    ],
    devServer: {
      contentBase: './demo'
    }
  };

  // Optimiise build for production
  if (env.NODE_ENV === 'production') {
    const aProductionPlugins = [
      new ShakePlugin(),
      new UglifyJSPlugin(),
      new BundleAnalyzerPlugin({analyzerMode: 'static'})
    ];
    config.plugins = [ ...config.plugins, ...aProductionPlugins ]
  }

  config.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: 'node-static',
      filename: 'd-theia.vendor.min.js',
      minChunks(module) {
        var context = module.context;
        return context && context.indexOf('node_modules') >= 0;
      }
    })
  );

  return config;
};
