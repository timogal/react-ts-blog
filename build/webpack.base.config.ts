import * as webpack from 'webpack';
import * as path from "path";
import { CheckerPlugin } from 'awesome-typescript-loader';

const baseModule: webpack.Rule[] = [
  {
    test: /\.tsx?$/,
    loader: 'babel-loader!awesome-typescript-loader',
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
  }
];

const basePlugins: webpack.Plugin[] = [
  new CheckerPlugin(),
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
    optimization: another.optimization
  };
}

export default mergeConfig;
