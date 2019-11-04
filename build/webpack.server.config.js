const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.config');
const externals = require('webpack-node-externals');

const config = {
  mode:'development',
  target:'node',
  entry:path.resolve('src/server/index.js'),
  output:{
    path:path.resolve(__dirname,'../dist/server'),
    publicPath:'/',
    filename:'[name].js',
    chunkFilename:'js/[name].js'
  },
  externals:[externals()]
}

module.exports = merge(common,config);