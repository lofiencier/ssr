import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter,Switch,Route } from 'react-router-dom';
import path from 'path';
import {matchRoutes} from 'react-router-config';
import routes,{Routes} from '../routes';
const app = express();

import { ChunkExtractor } from '@loadable/server'


app.use(express.static('dist'));

const App = ({req}) =>{
  return <StaticRouter context={{}} location={req.path}>
    <Switch>
      {
        routes.map((i)=><Route {...i} />)
      }
    </Switch>
  </StaticRouter>
}

const statsFile = path.resolve('dist/client/loadable-stats.json');

function loadComponents(branch) {
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
  Promise.all(loadedComponents).then(async()=>{
    const extractor = new ChunkExtractor({ statsFile });
    const jsx = extractor.collectChunks(<App req={req}/>);
    const scripts = extractor.getScriptElements();

    res.send(render(jsx,scripts).replace(/\s{2,}/g,''));
  })
})

app.listen(3000,()=>console.log('APP START'));

const render = (component,scripts)=>{
  const content = renderToString(component);
  const src = renderToString(scripts);
  console.log('src',src);
  return `
    <html>
      <head>
        <title>111</title>
      </head>
      <body>
        <div id="root">${content}</div>
        ${src}
      </body>
    </html>
  `
}