const webpack = require('webpack');
const merge = require("webpack-merge");
const path = require("path");
const glob = require("glob");

const parts = require("./webpack.parts");
const { commonConfig } = require("./webpack.common");

const PATHS = {
  app: path.join(__dirname, "src"),
};

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

module.exports = mode => {
  process.env.BABEL_ENV = mode;
  return merge(commonConfig, productionConfig, { mode });
};
