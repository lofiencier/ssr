// import TerserPlugin from 'terser-webpack-plugin';
import getModule from './getModule';
import getClientPlugins from './getClientPlugins';

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
      path: 'dist/client/',
      filename: `[name].js`,
      // publicPath: 'server/',
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
