const { merge } = require('lodash')
const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const base = require('./webpack.config')

module.exports = merge(base, {
  devtool: 'inline-source-map',

  module: {
    rules: [
      {
        test: /\.jsx?$/
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('app.css'),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['lib', 'polyfill'],
      minChunks: Infinity
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs'
    }),
    new webpack.DefinePlugin({
      '_': 'lodash/fp',
      '__DEV__': JSON.stringify(true),
      '__VERSION__': JSON.stringify(require('../package.json').version)
    })
  ],

  devServer: {
    proxy: {
      '/api': `http://localhost:${process.env.CONTRAST_SERVER_PORT}`
    },
    contentBase: path.resolve(__dirname, 'build'),
    compress: true,
    historyApiFallback: true
  }
})
