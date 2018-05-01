module.exports = {
  parser: 'postcss-scss',
  plugins: {
    cssnano: {},
    "postcss-import": {},
    autoprefixer: {},
    "postcss-cssnext": {
      browsers: ['last 2 versions', '> 5%'],
    },
  }
};
