/* eslint-disable */
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const isProd = process.env.NODE_ENV === 'production';

const config = {
  plugins: [
    new CopyPlugin([
      { from: 'public', to: '.' },
    ]),
    new Dotenv(),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.css/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true
          }
        }
      },
      {
        test: /\.html$/,
        use: [ {
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }],
      }
    ],
  },
  entry: './src/index.js',
  output: {
    filename: 'index.js'
  },
  // Sets mode as required by webpack
  mode: isProd ? 'production' : 'development',

  // Include source maps in development files
  devtool: isProd ? false : '#cheap-module-source-map',
};

if (!isProd) {
  config.devServer = {
    contentBase: path.resolve(__dirname, '..', 'static'),
    hot: true,
    publicPath: '/',
    historyApiFallback: true,
    open: true
  }
}

module.exports = config;
