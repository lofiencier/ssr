import nodeExternals from 'webpack-node-externals';
import getModule from './getModules';
import getServerPlugins from './getServerPlugins';
import path from 'path';

export default () => {
  return {
    mode: 'development',
    name: 'server',
    target: 'node',
    devtool: 'cheap-module-eval-source-map',
    entry: ['./src/server.js'],
    output: {
      publicPath:'server/',
      path: path.resolve('dist/server/'),
      filename: '[name].js',
      libraryTarget: 'commonjs2',
    },
    plugins: getServerPlugins(),
    module: getModule(),
    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: true,
      __dirname: true,
    },
    externals: [
      '@loadable/component',
      nodeExternals({
        whitelist: [/\.(?!(?:json)$).{1,5}$/i],
      }),
    ],
  };
};
