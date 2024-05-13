'use strict';
const path = require('path');
const webpackConfig = require('./webpack.conf');

module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    host: webpackConfig.process.host, // can be overwritten by process.env.HOST
    port: webpackConfig.process.port ? Number(webpackConfig.process.port) : 9000, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false,
    devtool: 'cheap-module-eval-source-map',
    cacheBusting: true,
    cssSourceMap: true,
  },
  build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    sysApp: webpackConfig.process.sysApp,
    assetsPublicPath: './',
    productionSourceMap: false,
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report,
    dist: path.resolve(__dirname, '../dist/' + webpackConfig.process.dist),
  },
};
