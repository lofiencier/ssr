import webpack from 'webpack';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import LoadablePlugin from '@loadable/webpack-plugin';

export default function getPlugins(isAnalyze) {
  return [
    new CleanWebpackPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    new LoadablePlugin(),
  ];
}
