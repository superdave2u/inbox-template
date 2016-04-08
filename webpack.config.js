var path = require('path');

var webpack = require('webpack'),
  ExtractTextPlugin = require("extract-text-webpack-plugin");

var precss = require('precss'),
  cssnext = require('postcss-cssnext'),
  colorhexa = require('postcss-color-hexa'),
  fontawesome = require('postcss-font-awesome');

module.exports = {
  // The standard entry point and output config
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/client.js',
  ],
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, 'dist'),
    publicPath: '/.tmp/'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'src'],
    extensions: ['', '.js', '.jsx' , '.css']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[local][hash:base64:4]!postcss-loader')
    }, {
      test: /\.(jpg|png|svg)$/,
      loader: 'url'
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=application/octet-stream"
    }, {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file"
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: "url?limit=10000&mimetype=image/svg+xml"
    }]
  },
  postcss: [precss, cssnext, fontawesome, colorhexa],
  // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
  plugins: [
    new ExtractTextPlugin("bundle.css", {
      allChunks: true
    }),
    // OccurenceOrderPlugin : optimizes chunks and modules by how much they are used in your app;
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
    // Remove NoErrorsPlugin
    // https://github.com/reactjs/redux/commit/be55659360722862b4efd153e992423f631a3de5
  ]
}
