'use strict'

const path = require('path');
const webpack = require('webpack');
const validate = require('webpack-validator');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = validate({
  // Ajuda na hora de debugar
  // - caso ocorra algum erro de script, na aba 'sources'
  //   o erro é mostrado no arquivo original, e não no
  //   arquivo de bundle compilado.
  devtool: 'source-map',

  entry: [
    // configurando react-hot-loader
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',

    // caminho do nosso arquivo principal de dev
    path.join(__dirname, 'src', 'index')
  ],

  output: {
    // saída do nosso arquivo final gerado pelo webpack
    path: path.join(__dirname, 'public', 'assets', 'js'),
    filename: 'bundle.js',

    // caminho virtual para webpack-dev-server
    publicPath: '/public/'
  },

  plugins: [
    // react-hot-loader
    new webpack.HotModuleReplacementPlugin(),

    new DashboardPlugin()
  ],

  module: {
    loaders: [{
      // configuração do babel para arquivos .js
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
