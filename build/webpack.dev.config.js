const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const mergeConfig = require('./webpack.base.config');
const { lessLoader, sassLoader } = require('./less.config');

module.exports = mergeConfig({
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true&path=/__webpack_hmr',
    './app/index'
  ],
  output: {
    publicPath: '/',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    chunkFilename: '[name].bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, enforce: 'pre', loader: 'source-map-loader' },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          lessLoader,
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader?modules&camelCase&importLoaders=1&localIdentName=[local]-[hash:base64:8]' },
          { loader: 'postcss-loader' },
          sassLoader,
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'app/index.html',
      filename: 'server/template/index.html'
    }),
  ],
  optimization: {
    splitChunks: false
  },
  devServer: {
    hot: true,
    inline: true,
    open: true,
    stats: 'errors-only'
  }
});
