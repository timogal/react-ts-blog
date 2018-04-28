import * as path from 'path';
import * as webpack from 'webpack';
import { CheckerPlugin } from 'awesome-typescript-loader';

const HtmlWebpackPlugin = require('html-webpack-plugin');

const config: webpack.Configuration = {
  mode: 'development',
  devtool: 'source-map',
  context: process.cwd(),
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
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.scss', '.json'],
    modules: ['app', 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader!awesome-typescript-loader',
        exclude: /node_modules/
      },
      { test: /\.js$/, enforce: 'pre', loader: 'source-map-loader' },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader?modules&camelCase&importLoaders=1&localIdentName=[local]-[hash:base64:8]' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.html/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CheckerPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: 'app/index.html',
      filename: 'server/template/index.html'
    })
  ]
};

export default config;
