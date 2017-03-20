const { merge } = require('lodash')
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const base = require('./webpack.config')

let devConfig = merge(base, {
  devtool: 'inline-source-map',

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'static/[name].js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              outputStyle: 'verbose',
              includePaths: [path.join(__dirname, 'node_modules')]
            }
          }
        ]
      }
    ]
  },

  devServer: {
    proxy: {
      '/api': `http://localhost:${process.env.CONTRAST_SERVER_PORT}`
    },
    contentBase: path.resolve(__dirname, 'build'),
    compress: true,
    historyApiFallback: true
  }
})

devConfig.plugins.push(...[
  new HtmlWebpackPlugin({
    template: 'src/index.ejs'
  }),

  new webpack.DefinePlugin({
    '__DEV__': JSON.stringify(true),
    '__VERSION__': JSON.stringify(require('./package.json').version)
  })
])

module.exports = devConfig
