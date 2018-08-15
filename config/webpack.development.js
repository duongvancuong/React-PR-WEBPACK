const webpack = require('webpack');
const merge = require("webpack-merge");

const parts = require("./webpack.parts");
const { commonConfig } = require("./webpack.common");

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
  return merge(commonConfig, developmentConfig, { mode });
};
