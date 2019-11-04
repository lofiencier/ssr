const path= require('path');
const loaders=require('./loaders');
const LoadablePlugin = require('@loadable/webpack-plugin')

const isProd= process.env.NODE_ENV=='production';
module.exports={
    resolve:{
        modules:['node_modules'],
        extensions:['.ts','.tsx','.js','.jsx'],
    },
    resolveLoader:{
        modules:['node_modules']
    },
    module:{
        rules:[
            loaders.babel(),
            // loaders.less(),
            // loaders.css(),
            // loaders.images(),
            // loaders.fonts(),
            // loaders.medias(),
            // ...!isProd?[loaders.eslint()]:[],
        ]
    },
    externals:{},
    plugins:[
        new LoadablePlugin({filename:'../stat.json'}),
    ]
}