const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "development",
  devtool: "source-map",
  context: path.resolve(__dirname, '../'),
  entry: [
    'webpack-hot-middleware/client?reload=true&path=/__webpack_hmr',
    "./app/index",
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      {test: /\.tsx?$/, loader: 'awesome-typescript-loader'},
      {enforce: 'pre', test: /\.js$/, loader: 'source-map-loader'}
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // tell webpack to hot reload
    new HtmlWebpackPlugin({
      inject: true,
      template: 'app/index.html'
    })
  ],
  devServer: {
    inline: true
  }
};
