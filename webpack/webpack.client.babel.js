// import TerserPlugin from 'terser-webpack-plugin';
import getModule from './getModules';
import getClientPlugins from './getClientPlugins';
import path from 'path';

export default () => {
  return {
    mode: 'development',
    name: 'client',
    target: 'web',
    cache: true,
    devtool: 'cheap-module-eval-source-map',
    entry: [
      './src/client.js',
    ],
    output: {
      path: path.resolve('dist/client/'),
      filename: `[name].js`,
      publicPath: 'client/',
      chunkFilename:'[id].js'
    },
    plugins: getClientPlugins(),
    optimization: {
      splitChunks: {
        name: 'vendors',
        chunks: 'initial',
      },
      minimize: false,
    },
    module: getModule(),
    node: {
      fs: 'empty',
      vm: 'empty',
      net: 'empty',
      tls: 'empty',
    },
  };
};
