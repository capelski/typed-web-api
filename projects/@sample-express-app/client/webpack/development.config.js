const { merge } = require('webpack-merge');
const baseConfig = require('./base.config');

module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    open: true,
    port: 8081,
    proxy: {
      '/full-path': 'http://localhost:3001',
      '/prefix': 'http://localhost:3001',
      '/express-router': 'http://localhost:3001',
    },
  },
});
