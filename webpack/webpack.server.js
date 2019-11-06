import nodeExternals from 'webpack-node-externals';
import getModule from './getModule';
import getServerPlugins from './getServerPlugins';
import path from 'path';

export default () => {
  return {
    mode: env,
    name: 'server',
    target: 'node',
    devtool: 'cheap-module-eval-source-map',
    entry: ['./src/server.js'],
    output: {
      path: path.resolve('dist'),
      filename: 'server.js',
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
