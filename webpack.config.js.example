const webpack = require('webpack');
const merge = require("webpack-merge");
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const glob = require("glob");

const parts = require("./webpack.parts");

const PATHS = {
  app: path.join(__dirname, "src"),
};

const commonConfig = merge([
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
      path: __dirname + '/dist',
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

const productionConfig = merge([
  parts.generateSourceMaps({ type: "eval-source-map" }),
  parts.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
  }),
  parts.extractCSS({
    use: [parts.cssLoader(), parts.scssLoader(), parts.autoprefix()],
  }),
  parts.loadImages({
    options: {
      limit: 15000,
      name: "[name].[ext]",
    },
  }),
]);

const developmentConfig = merge([
  parts.devServer({
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.extractCSS({
    use: [parts.cssLoader(), parts.scssLoader(), parts.autoprefix()],
  }),
  parts.loadImages(),
]);

module.exports = mode => {
  process.env.BABEL_ENV = mode;
  if (mode === "production") {
    return merge(commonConfig, productionConfig, { mode });
  }

  return merge(commonConfig, developmentConfig, { mode });
};
