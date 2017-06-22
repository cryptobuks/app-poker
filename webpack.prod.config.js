'use strict'

const path = require('path');
const webpack = require('webpack');
const validate = require('webpack-validator');

module.exports = validate({
  entry: path.join(__dirname, 'src', 'index'),

  output: {
    path: path.join(__dirname, 'public', 'assets', 'js'),
    filename: 'script.js',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false}
    }),

    // remove duplicação de dependências
    new webpack.optimize.DedupePlugin(),

    // ajusta ordem de carregamento dos plugins
    new webpack.optimize.OccurrenceOrderPlugin()
  ],

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      include: /src/,
      loader: 'babel-loader'
    }, {
      test: /\.css/,
      loaders: ['style-loader', 'css-loader'],
      include: /src/
    }
    ]
  }
})
