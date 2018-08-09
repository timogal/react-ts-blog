const webpack = require('webpack');
const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');
const { lessPlugin } = require('./less.config');

const baseModule = [
  {
    test: /\.tsx?$/,
    use: [
      'babel-loader',
      'awesome-typescript-loader'
    ],
    exclude: /node_modules/
  },
  {
    test: /\.html/,
    loader: 'html-loader'
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
];

const basePlugins = [
  new CheckerPlugin(),
  lessPlugin,
];

function mergeConfig(another) {
  return {
    mode: another.mode || 'development',
    devtool: another.devtool,
    entry: another.entry,
    context: process.cwd(),
    output: Object.assign({
      path: path.resolve(__dirname, '../dist'),
    }, another.output),
    resolve: {
      extensions: ['.js', '.ts', '.tsx', '.scss', '.json'],
      modules: ['app', 'node_modules']
    },
    module: {
      rules: another.module ? baseModule.concat(another.module.rules) : baseModule
    },
    plugins: another.plugins ? basePlugins.concat(another.plugins) : basePlugins,
    optimization: another.optimization,
    devServer: another.devServer,
  };
}

module.exports = mergeConfig;
