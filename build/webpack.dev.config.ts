import * as path from "path";
import * as webpack from 'webpack';

import mergeConfig from './webpack.base.config';

const HtmlWebpackPlugin = require('html-webpack-plugin');

export default mergeConfig({
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
      {test: /\.js$/, enforce: 'pre', loader: 'source-map-loader'},
      {
        test: /\.scss$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader?modules&camelCase&importLoaders=1&localIdentName=[local]-[hash:base64:8]'},
          {loader: 'postcss-loader'},
          {loader: 'sass-loader'}
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
    })
  ]
});
