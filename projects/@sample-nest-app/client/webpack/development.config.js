const { merge } = require('webpack-merge');
const baseConfig = require('./base.config');

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    open: true,
    port: 8082,
    proxy: {
      '/api': 'http://localhost:3002',
    },
  },
});
