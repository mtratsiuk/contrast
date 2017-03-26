const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

module.exports = {
  context: __dirname,

  entry: {
    app: './src/app.js'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'static/[name].[chunkhash].js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/@material')
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, 'src')
        ]
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'lib',
      minChunks: module => {
        return module.context && module.context.indexOf('node_modules') !== -1
      }
    }),

    new ExtractTextPlugin('static/app.css'),

    new webpack.NoEmitOnErrorsPlugin(),

    new ProgressBarPlugin()
  ]
}
