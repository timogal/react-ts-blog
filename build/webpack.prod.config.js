const mergeConfig = require('./webpack.base.config');
const { lessLoader, sassLoader } = require('./less.config');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyjsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = mergeConfig({
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
          'postcss-loader',
          sassLoader,
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
    noEmitOnErrors: true,
    namedModules: true,
    minimizer: [
      new UglifyjsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: {
            drop_console: true
          }
        },
      }),
      new OptimizeCssPlugin()
    ],
    runtimeChunk: {
      name: 'manifest'
    },
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
