const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const base = require('./webpack.base.conf')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const utils = require('./utils')
const merge = require('webpack-merge')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.bundle.env

base.entry = {
  'VueMultiselect': './src/index.js'
}

const webpackConfig = merge(base, {
  output: {
    path: config.bundle.assetsRoot,
    publicPath: config.bundle.assetsPublicPath,
    filename: 'vue-multiselect.js',
    library: 'VueMultiselect',
    libraryTarget: 'umd'
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.bundle.productionSourceMap,
      extract: true
    })
  },
  devtool: config.bundle.productionSourceMap ? '#source-map' : false,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new ExtractTextPlugin({
      filename: 'vue-multiselect.css'
    })
  ]
})

module.exports = webpackConfig
