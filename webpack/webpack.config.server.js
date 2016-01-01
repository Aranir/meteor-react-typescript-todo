var path = require('path');
var webpack = require('webpack');


var babelQuery = {
  cacheDirectory: true,

  presets: ['es2015']
};


module.exports = {
  context: __dirname,
  target: 'node',
  entry: [
    'regenerator/runtime',
    '../app/server/index',
  ],
  output: {
    path: path.join(__dirname, 'assets'),
    filename: 'server.bundle.js',
    publicPath: '/assets/',
  },
  resolve: {
    extensions: ['',  '.ts', '.tsx', '.js', '.jsx'],
    root: path.join(__dirname, '../app'),
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: 'babel?' + JSON.stringify(babelQuery) + '!ts-loader',
        exclude: /node_modules|lib/,
      },
      {
        test: /\.jsx?$/,
        loader: 'babel?' + JSON.stringify(babelQuery),
        exclude: /node_modules|lib/,
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
    ],
  },
};
