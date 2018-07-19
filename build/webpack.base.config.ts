import * as webpack from 'webpack';
import * as path from 'path';
import { CheckerPlugin } from 'awesome-typescript-loader';
import { lessPlugin } from './less.config';

const baseModule: webpack.Rule[] = [
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
    test: /\.ico$/,
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

const basePlugins: webpack.Plugin[] = [
  new CheckerPlugin(),
  lessPlugin,
];

function mergeConfig(another: webpack.Configuration): webpack.Configuration {
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

export default mergeConfig;
