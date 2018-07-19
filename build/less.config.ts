import { join } from 'path';

const AntdScssThemePlugin = require('antd-scss-theme-plugin');

const themeFilePath = join(process.cwd(), 'app/styles/variables.scss');

export const lessPlugin = new AntdScssThemePlugin(themeFilePath);

export const lessLoader = AntdScssThemePlugin.themify('less-loader');
export const sassLoader = AntdScssThemePlugin.themify('sass-loader');

