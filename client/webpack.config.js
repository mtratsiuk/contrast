const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

module.exports = {
  context: __dirname,

  entry: {
    app: './src/app.js',
    lib: [
      'lodash/fp',
      'react',
      'react-dom',
      'react-redux',
      'redux',
      'redux-thunk'
    ],
    polyfill: [
      'core-js/fn/object/assign',
      'promise-polyfill',
      'regenerator-runtime',
      'whatwg-fetch'
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'static/[name].bundle.[chunkhash].js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.less$/,
        include: [
          path.resolve(__dirname, 'src')
        ]
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['lib', 'polyfill'],
      minChunks: Infinity
    }),

    new ExtractTextPlugin('static/app.css'),

    new webpack.NoEmitOnErrorsPlugin(),

    new ProgressBarPlugin()
  ]
}
