import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter,Switch,Route } from 'react-router-dom';
import path from 'path';
import {matchRoutes} from 'react-router-config';
import routes from '../routes';
import Routes from '../App';
const app = express();

import { ChunkExtractor } from '@loadable/server'


app.use(express.static('dist'));

const App = ({req}) =>{
  return <StaticRouter context={{}} location={req.path}>
    <Routes />
  </StaticRouter>
}

const statsFile = path.resolve('dist/client/loadable-stats.json');
const nodeStatsFile = path.resolve('dist/server/loadable-stats.json');

function loadComponents(branch) {
  console.log('branch',branch);
  return Promise.all(
    branch.map(({ route,...rest }) => {
      if (route.component.load) {
        return route.component.load();
      }
      return Promise.resolve();
    })
  );
}

app.get('*',async (req,res)=>{
  const branch = matchRoutes(routes, req.path);
  const loadedComponents = await loadComponents(branch);
  console.log('loadedComponents',loadedComponents);
  Promise.all(loadedComponents).then(async()=>{
    const extractor = new ChunkExtractor({ statsFile });
    const nodeExtractor = new ChunkExtractor({ statsFile:nodeStatsFile,entrypoints:'Home' });
    console.log('nodeExtrator',nodeExtractor);
    const emt = nodeExtractor.requireEntrypoint();
    console.log('entry:',emt);
    const jsx = extractor.collectChunks(<App req={req}/>);
    // const scripts = extractor.getScriptElements();
    const tags = extractor.getScriptTags();
    res.send(render(jsx,tags));
  })
})

app.listen(3000,()=>console.log('APP START'));

const render = (component,tags)=>{
  const content = renderToString(component);
  const script = renderToString(tags);
  console.log('script',script);
  return `
    <html>
      <head>
        <title>111</title>
      </head>
      <body>
        <div id="root">${content}</div>
        ${tags}
      </body>
    </html>
  `
}