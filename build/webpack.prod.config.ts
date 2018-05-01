import * as webpack from 'webpack';

import mergeConfig from './webpack.base.config';

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

export default mergeConfig({
  mode: 'production',
  entry: {
    app: './app/index'
  },
  output: {
    chunkFilename: '[name].[chunkhash].bundle.js',
    filename: '[name].[chunkhash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?modules&camelCase&importLoaders=1&localIdentName=[local]-[hash:base64:8]',
          'postcss-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.css$/,
        loaders: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'app/index.html',
      filename: '../server/template/index.html'
    })
  ],
  optimization: {
    minimize: true,
    splitChunks: {
      name: 'vendor',
      chunks: 'all',
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          enforce: true
        }
      },
    }
  }
});
