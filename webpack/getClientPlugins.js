import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import LoadablePlugin from '@loadable/webpack-plugin';

export default function getPlugins(isAnalyze) {
  return [
    new webpack.NoEmitOnErrorsPlugin(),
    new LoadablePlugin(),
    new CleanWebpackPlugin,
    new ManifestPlugin(),
  ]
}