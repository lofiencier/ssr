import webpack from 'webpack';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';

export default function getPlugins(isAnalyze) {
  return [
    new CleanWebpackPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new LoadablePlugin(),
    new ManifestPlugin(),
  ]
}