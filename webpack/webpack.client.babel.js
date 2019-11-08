import TerserPlugin from 'terser-webpack-plugin';
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
      chunkFilename:'[name].js'
    },
    plugins: getClientPlugins(),
    optimization: {
      minimize: false,
      // minimizer: [
      //   new TerserPlugin({
      //     cache: true,
      //     parallel: true,
      //     sourceMap: false,
      //     terserOptions: {
      //       ecma: 6,
      //       compress: true,
      //       output: {
      //         comments: false,
      //         beautify: false
      //       }
      //     }
      //   }),
      // ],
      splitChunks: {
        name: 'vendors',
        chunks: 'initial',
      },
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
