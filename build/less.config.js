const { join } = require('path');

const AntdScssThemePlugin = require('antd-scss-theme-plugin');

const themeFilePath = join(process.cwd(), 'app/styles/variables.scss');

const lessPlugin = new AntdScssThemePlugin(themeFilePath);

const lessLoader = AntdScssThemePlugin.themify('less-loader');
const sassLoader = AntdScssThemePlugin.themify('sass-loader');

module.exports = {
  lessPlugin,
  lessLoader,
  sassLoader
};

