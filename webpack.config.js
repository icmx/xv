const path = require('path');

const webpack = require('webpack');
const { merge } = require('webpack-merge');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { DefinePlugin, SourceMapDevToolPlugin } = webpack;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const meta = require('./package.json');

const CONSTS = {
  globalConst: {
    version: meta.version,
    license: meta.license,
  },
};

const NAMES = {
  src: 'src',
  dist: 'dist',
  assets: 'assets',
  static: 'static',
};

const PATHS = {
  src: path.join(__dirname, NAMES.src),
  dist: path.join(__dirname, NAMES.dist),
  assets: path.join(__dirname, NAMES.src, NAMES.assets),
  static: path.join(__dirname, NAMES.src, NAMES.static),
};

const createDefinitions = (consts) =>
  Object.fromEntries(
    Object.entries(consts.globalConst).map(([key, value]) => [
      `${Object.keys(consts)[0]}.${key}`,
      JSON.stringify(value),
    ])
  );

const createBaseConfig = (paths, options) => ({
  entry: {
    main: `${paths.src}/index.js`,
    sw: `${paths.src}/sw.js`,
  },
  output: {
    filename: `[name].js`,
    path: paths.dist,
    publicPath: '/',
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
                plugins: ['postcss-import', 'postcss-csso'],
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '~': `${paths.src}`,
    },
  },
  plugins: [
    new DefinePlugin(createDefinitions(options.consts)),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${paths.assets}`,
          to: `${paths.assets.split(path.sep).slice(-1)[0]}`,
          noErrorOnMissing: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: `${paths.src}/index.html`,
      filename: `index.html`,
      templateParameters: {
        ...options.consts,
      },
    }),
  ],
});

const createWatchConfig = (paths, options) =>
  merge(createBaseConfig(paths, options), {
    name: 'watch',
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
      port: options.port,
      liveReload: true,
      watchFiles: [`${paths.src}/**/*`],
      static: {
        publicPath: '/',
        directory: `${paths.static}`,
      },
      client: {
        overlay: {
          warnings: true,
          errors: true,
        },
      },
      proxy: {
        '/api/comics': {
          target: 'https://xkcd.com',
          pathRewrite: { '^/api/comics/xkcd': '' },
          changeOrigin: true,
        },
        '/files/comics': {
          target: 'https://imgs.xkcd.com/comics',
          pathRewrite: { '^/files/comics/xkcd': '' },
          changeOrigin: true,
        },
      },
    },
    plugins: [
      new SourceMapDevToolPlugin({
        filename: '[file].map',
      }),
    ],
  });

const createBuildConfig = (paths, options) =>
  merge(createBaseConfig(paths, options), {
    name: 'build',
    mode: 'production',
    plugins: [],
  });

module.exports = [
  createWatchConfig(PATHS, { consts: CONSTS, port: 8000 }),
  createBuildConfig(PATHS, { consts: CONSTS }),
];
