import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import project from './package.json' assert { type: 'json' };

const { DefinePlugin, SourceMapDevToolPlugin } = webpack;
const { version, license } = project;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CONSTS = {
  globalConst: {
    version,
    license,
  },
};

const NAMES = {
  src: 'src',
  dist: 'dist',
  static: 'static',
};

const PATHS = {
  src: join(__dirname, NAMES.src),
  dist: join(__dirname, NAMES.dist),
  static: join(__dirname, NAMES.src, NAMES.static),
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
    ['main']: `${paths.src}/index.js`,
    ['service-worker']: `${paths.src}/service-worker.js`,
  },
  output: {
    filename: '[name].js',
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
        test: /\.js/,
        resolve: {
          fullySpecified: false,
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
      '#': `${paths.src}`,
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
          from: `${paths.static}`,
          to: '',
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
      proxy: [
        {
          context: ['/api/comics'],
          target: 'https://xkcd.com',
          pathRewrite: { '^/api/comics/xkcd': '' },
          changeOrigin: true,
        },
        {
          context: ['/files/comics'],
          target: 'https://imgs.xkcd.com/comics',
          pathRewrite: { '^/files/comics/xkcd': '' },
          changeOrigin: true,
        },
      ],
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

export default [
  createWatchConfig(PATHS, { consts: CONSTS, port: 8000 }),
  createBuildConfig(PATHS, { consts: CONSTS }),
];
