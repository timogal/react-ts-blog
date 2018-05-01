module.exports = {
  parser: 'postcss-scss',
  plugins: {
    cssnano: {},
    "postcss-import": {browsers: ['last 2 versions', '> 5%']},
    autoprefixer: {},
    "postcss-cssnext": {},
  }
};
