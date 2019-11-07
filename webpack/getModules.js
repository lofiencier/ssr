import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const babel=()=>{
  return {
    test: /\.js$/,
    include: path.resolve('src'),
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
    },
  }
}
const less = (isServer)=>{
  return {
    test:/\.less$/,
    include:path.resolve('src'),
    exclude:/node_moduels/,
    use:[
      isServer?isomorphic():styleLoader(),
      cssLoader(),
      postLoader(),
      lessLoader(),
    ],
  }
}

const lessLoader=()=>({
  loader:'less-loader',
});
const postLoader=()=>({
  loader:'postcss-loader',
});
const cssLoader=()=>({
  loader:'css-loader',
});
const styleLoader=(isDev)=>{
  return {
    loader:MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../',
      hmr: isDev,
    },
  }
};
const isomorphic=()=>{
  return {
    loader:'isomorphic-style-loader'
  }
};

export default function getModule(isServer) {
  return {
    rules: [
      babel(),
      less(isServer),
    ],
  };
}
