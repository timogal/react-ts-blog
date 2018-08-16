const path = require('path');
const fs = require('fs');

const webpack = require('webpack');

const { CheckerPlugin } = require('awesome-typescript-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { lessPlugin, lessLoader, sassLoader } = require('./less.config');

function getExternals() {
  return fs.readdirSync(path.join(process.cwd(), 'node_modules'))
    .filter((filename) => !filename.includes('.bin'))
    .reduce((externals, filename) => {
      externals[filename] = `commonjs ${filename}`;
      return externals;
    }, {});
}

module.exports = {
  mode: 'production',
  entry: {
    app: './server/index.ts',
  },
  context: process.cwd(),
  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: "index.js",
    chunkFilename: "[name].[chunkhash].js",
    publicPath: "/"
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.scss', '.json'],
    modules: ['app', 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
        options: {
          configFileName: 'tsconfig.server.json'
        }
      },
      {
        test: /\.(ico|txt)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(ttf|eot|woff|svg|png|jpg|gif)$/,
        loader: 'file-loader',
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          lessLoader,
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?modules&camelCase&importLoaders=1&localIdentName=[local]-[hash:8]',
          sassLoader,
        ]
      },
      {
        test: /\.css$/,
        loaders: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },
    ]
  },
  plugins: [
    new CheckerPlugin(),
    lessPlugin,
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('production')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[contenthash].css',
    })
  ],
  target: "node",
  externals: getExternals()
};
