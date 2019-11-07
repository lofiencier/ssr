import webpack from 'webpack';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';


export default function getPlugins(isAnalyze) {
  return [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new LoadablePlugin(),
    new ManifestPlugin(),
  ]
}