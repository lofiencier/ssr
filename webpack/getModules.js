const path = require('path');

export default function getModule() {
  return {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve('src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  };
}
