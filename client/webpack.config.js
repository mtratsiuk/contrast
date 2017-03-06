const path = require('path')

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
    filename: '[name].bundle.[chunkhash].js'
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
  }
}
