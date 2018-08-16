const setupAssetHook = require('asset-require-hook');
const setupStyleHook = require('css-modules-require-hook');
const nodeSass = require('node-sass');
const lessParser = require('postcss-less').parse;

export default function addAssetHooks() {
  let webpackConfig;
  if (process.env.NODE_ENV === 'production') {
    webpackConfig = require('../../build/webpack.prod.config');
  } else {
    webpackConfig = require('../../build/webpack.dev.config');
  }

  setupAssetHook({
    extensions: ['ico', 'txt'],
    name: '[name].[ext]',
    publicPath: webpackConfig.output.publicPath || '/',
  });

  setupAssetHook({
    extensions: ['jpg', 'png'],
    name: '[hash].[ext]',
    publicPath: webpackConfig.output.publicPath || '/',
  });

  setupStyleHook({
    extensions: ['.scss'],
    preprocessCss(data: any, filename: any) {
      return nodeSass.renderSync({
        data,
        file: filename,
      }).css;
    },
    camelCase: true,
    generateScopedName: '[local]-[hash:8]',
  });

  setupStyleHook({
    extensions: ['.less'],
    processorOpts: { parser: lessParser },
    generateScopedName: '[name]',
  });

  setupStyleHook({
    extensions: ['.css'],
    generateScopedName: '[name]',
  });

}
