var path = require('path');
var webpack = require('webpack');
require('style-loader');
require('css-loader');

module.exports = {
  entry: [
    './public/js/app'
  ],
  devtool: 'eval-source-map',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'app.js',
    publicPath: '/js/'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style-loader!css-loader", include: path.join(__dirname, 'public/css') },
      { test: /\.js$/, loaders: ['babel'], include: path.join(__dirname, 'public/') }
    ]
  }
};
