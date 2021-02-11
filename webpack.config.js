const path = require('path');

const webpack = require('webpack');
const { merge } = require('webpack-merge');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
  src: path.join(__dirname, `src`),
  dist: path.join(__dirname, `dist`),
};

const baseConfig = {
  externals: {
    paths: paths,
  },
  entry: {
    main: `${paths.src}/index.js`,
  },
  output: {
    filename: `[name].js`,
    path: paths.dist,
    publicPath: '/xv',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: { esmodules: true },
                  bugfixes: true,
                  shippedProposals: true,
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-csso'],
              },
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.min.css',
    }),
    new HtmlWebpackPlugin({
      template: `${paths.src}/index.html`,
      filename: `./index.html`,
    }),
  ],
};

const serveConfig = merge(baseConfig, {
  name: 'serve',
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    publicPath: '/',
    contentBase: baseConfig.externals.paths.dist,
    port: 8000,
    overlay: {
      warnings: true,
      errors: true,
    },
    proxy: {
      '/api/comics': {
        target: 'https://xkcd.com',
        pathRewrite: { '^/api/comics': '' },
        changeOrigin: true,
      },
      '/files/comics': {
        target: 'https://imgs.xkcd.com/comics',
        pathRewrite: { '^/files/comics': '' },
        changeOrigin: true,
      },
    },
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
  ],

  // Temporary workaround for hot reloading.
  // See https://github.com/webpack/webpack-dev-server/issues/2758
  //
  // webpack-dev-server not reloading page when "browserslist" is
  // presented in package.json, but this entry below fixing it.
  // However this approach is incorrect (should be 'browserslist'
  // instead of 'web', or just omitted since 'browserslist' is default).
  //
  // This should be removed when webpack-dev-server v4 will release.
  target: 'web',
});

const buildConfig = merge(baseConfig, {
  name: 'build',
  mode: 'production',
  plugins: [],
});

module.exports = [serveConfig, buildConfig];
