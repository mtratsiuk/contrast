const { merge } = require('lodash')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanCSSPlugin = require('less-plugin-clean-css')
const AutoprefixPlugin = require('less-plugin-autoprefix')
const base = require('./webpack.config')

let prodConfig = merge(base, {
  module: {
    rules: [
      {
        test: /\.jsx?$/
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'less-loader',
              options: {
                lessPlugins: [
                  new AutoprefixPlugin({ browsers: ['last 2 versions'] }),
                  new CleanCSSPlugin({ advanced: true })
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
    '_': 'lodash/fp',
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

  new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    mangle: {
      screw_ie8: true,
      keep_fnames: true
    },
    compress: {
      screw_ie8: true,
      warnings: false
    },
    comments: false
  })
])

module.exports = prodConfig
