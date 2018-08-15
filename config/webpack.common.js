const webpack = require('webpack');
const merge = require("webpack-merge");
const path = require("path");
const fs = require('fs');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const parts = require("./webpack.parts");

const PATHS = {
  app: path.join(__dirname, "src"),
};

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

exports.commonConfig = merge([
  {
    entry: [
      'react-hot-loader/patch',
      './src/index.jsx'
    ],
    devtool: "sourcemap",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader', 'eslint-loader']
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: { minimize: true }
            }
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader'
            }
          ]
        },
        {
          // Match woff2 and patterns like .woff?v=1.1.1.
          test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
          use: {
            loader: "url-loader",
            options: {
              limit: 50000,
              mimetype: "application/font-woff",
              name: "./fonts/[name].[ext]", // Output below ./fonts
              publicPath: "../", // Take the directory into account
            },
          },
        },
      ]
    },
    resolve: {
      extensions: ['*', '.js', '.jsx', '.json'],
    },
    output: {
      path: resolveApp('build'),
      publicPath: '/',
      filename: 'bundle.js'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html",
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
        inject: true,
        trackJSToken: '',
      }),
      new webpack.WatchIgnorePlugin([
        path.join(__dirname, "node_modules")
      ]),
    ],
  },
  parts.loadJavaScript({ include: PATHS.app }),
]);
