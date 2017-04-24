const { merge } = require('lodash')
const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BabiliPlugin = require('babili-webpack-plugin')
const base = require('./webpack.config')

let prodConfig = merge(base, {
  module: {
    rules: [
      {
        test: /\.jsx?$/
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('postcss-clean')(),
                  require('autoprefixer')({ browsers: 'last 2 Chrome versions' })
                ]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [
                  path.join(__dirname, 'node_modules'),
                  path.join(__dirname, 'src')
                ]
              }
            }
          ]
        })
      }
    ]
  }
})

prodConfig.plugins.push(...[
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
    '__DEV__': JSON.stringify(false),
    '__VERSION__': JSON.stringify(require('./package.json').version)
  }),

  new HtmlWebpackPlugin({
    template: 'src/index.ejs',
    minify: {
      collapseWhitespace: true,
      conservativeCollapse: true
    }
  }),

  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),

  new BabiliPlugin()
])

module.exports = prodConfig
