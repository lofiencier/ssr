import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter,Switch,Route } from 'react-router-dom';
import path from 'path';
import routes from '../routes';
const app = express();

import { ChunkExtractor } from '@loadable/server'


app.use(express.static('dist'));

// const App = ({req}) =>{
//   return <StaticRouter context={{}} location={req.path}>
//     <Switch>
//       {
//         routes.map(i=><Route key={i.name} {...i} component={require(i.component).default} />)
//       }
//     </Switch>
//   </StaticRouter>
// }

const statsFile = path.resolve('dist/stat.json');

console.log('statsFile',statsFile);

const extractor = new ChunkExtractor({ statsFile });
const { default: App } = extractor.requireEntrypoint()


const jsx =(req)=> extractor.collectChunks(<App />);

// You can now collect your script tags
const scriptTags = extractor.getScriptTags() // or extractor.getScriptElements();

// You can also collect your "preload/prefetch" links
const linkTags = extractor.getLinkTags() // or extractor.getLinkElements();

// And you can even collect your style tags (if you use "mini-css-extract-plugin")
const styleTags = extractor.getStyleTags() // or extractor.getStyleElements();

app.get('*',(req,res)=>{
  res.send(render(jsx(req)));
})

app.listen(3000,()=>console.log('APP START'));

const render = (component)=>{
  const content = renderToString(component)
  return `
    <html>
      <head>
        <title>111</title>
      </head>
      <body>
        <div id="root">${content}</div>
        <script src="client/main.js"></script>
      </body>
    </html>
  `
}