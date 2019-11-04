const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.config');

const config = {
  mode:'development',
  entry:path.resolve('src/client/index.js'),
  output:{
    path:path.resolve(__dirname,'../dist/client'),
    publicPath:'/',
    filename:'[name].js',
    chunkFilename:'js/[name].js'
  }
}

module.exports = merge(common,config);