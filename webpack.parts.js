const PurifyCSSPlugin = require('purifycss-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    stats: 'errors-only',
    contentBase: './dist',
    hot: true,
    open: true,
    overlay: true,
    watchOptions: {
      // Delay the rebuild after the first change
      aggregateTimeout: 300,
      // Poll using interval (in ms, accepts boolean too)
      poll: 1000,
    },
  },
});

exports.purifyCSS = ({ paths }) => ({
  plugins: [new PurifyCSSPlugin({ paths })],
});

exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => [require('autoprefixer')()],
  },
});

exports.cssLoader = () => ({
  loader: 'css-loader',
  options: {
    importLoaders: 2,
    sourceMap: true,
  },
});

exports.scssLoader = () => ({
  loader: 'sass-loader',
  options: {
    sourceMap: true,
  },
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        include,
        exclude,
        use: {
          loader: 'url-loader',
          options,
        },
      },
    ],
  },
});

exports.loadJavaScript = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        use: 'babel-loader',
      },
    ],
  },
});

exports.extractCSS = ({ include, exclude, use = [] }) => {
  // Output extracted CSS to a file
  const plugin = new MiniCssExtractPlugin({
    filename: '[name].css',
  });

  return {
    module: {
      rules: [
        {
          test: /\.(css|sass|scss)$/,
          include,
          exclude,

          use: [
            MiniCssExtractPlugin.loader,
          ].concat(use),
        },
      ],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          js: {
            test: /\.js$/,
            name: 'commons',
            chunks: 'all',
            minChunks: 7,
          },
          css: {
            test: /\.(css|sass|scss)$/,
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
          },
        },
      },
    },
    plugins: [plugin],
  };
};

exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});
