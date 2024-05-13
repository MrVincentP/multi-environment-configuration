const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const webpack = require('webpack');
const webpackConfig = require('../config/webpack.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BuildENV = webpackConfig.getBuildENV({
  NODE_ENV: '"development"',
  prod: '"dev"',
});
const os = require('os');
const interfaces = os.networkInterfaces();
let localIpAddress;
Object.keys(interfaces).forEach((interfaceName) => {
  interfaces[interfaceName].forEach((interfaceData) => {
    if (interfaceData.family === 'IPv4' && !interfaceData.internal) {
      localIpAddress = interfaceData.address;
    }
  });
});

module.exports = (RESETENV) => {
  let DEVConf;
  DEVConf = {
    devtool: 'inline-source-map',
    mode: 'development',
    cache: {
      type: 'filesystem',
    },
    devServer: {
      host: BuildENV.host,
      port: BuildENV.port && Number(BuildENV.port),
      hot: true,
      client: {
        reconnect: false,
        progress: false,
        overlay: false,
      },
      proxy: [{
        context: ['/api'],
        target: BuildENV.apiURL,
        pathRewrite: { '^/api': '/api' },
      }],
      allowedHosts: 'all',
    },
    module: {
      rules: [{
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.less$/i,
        use: ['style-loader', 'css-loader', 'less-loader'],
      }],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './' + BuildENV.sysApp + '/' + BuildENV.filename,
        filename: 'index.html',
        title: BuildENV.title,
        inject: true,
        timeStamp: new Date().valueOf(),
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
        },
        vConsole: false,
        prod: false,
        staticURL: BuildENV.staticURL,
        webURL: BuildENV.webURL,
      }),
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: {
          messages: [`Your App is running at http://${localIpAddress}:${BuildENV.port}`,
            `Your localhost is http://localhost:${BuildENV.port}`],
        },
        clearConsole: true,
        onErrors(severity, errors) {
        },
      }),
      new webpack.DefinePlugin({
        'process.env': webpackConfig.getNodeENV({
          NODE_ENV: '"development"',
          prod: '"dev"',
        })
      })],
  };

  return merge(common(RESETENV), DEVConf);
};
