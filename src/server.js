import express from 'express';
import favicon from 'serve-favicon';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import routes from 'routes';
import path from 'path';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import logger from 'morgan';

import getHtmlString from './utils/getHtmlString';

import App from './App';

const port = process.env.PORT || 3000;

const app = express();

app.use(logger('dev'));
app.use(express.static('dist/',{
  setHeaders:res=>{
    res.set('Service-Worker-Allowed', '/');
  }
}))

app.use(favicon('public/favicon.ico'));


const loadComponents = branch => {
  return Promise.all(
    branch.map(({ route }) => {
      if (route.component.load) {
        return route.component.load();
      }
      return Promise.resolve();
    })
  );
};

const statsFile = path.resolve('dist/client/loadable-stats.json');
// const nodeStatsFile = path.resolve('dist/server/loadable-stats.json');



app.get('*', async(req,res)=>{
  const route = matchRoutes(routes,req.path)||[];
  // script补全？这loadable有问题啊

  const loaded = await loadComponents(route);

  const keys = ['main',...route.map(i=>i.route && i.route.key)];
  const extractor = new ChunkExtractor({ statsFile, entrypoints:keys });

  const AppComponent =(
    <StaticRouter location={req.path} context={{}}>
      <App />
    </StaticRouter>
  );
  const jsx = extractor.collectChunks(AppComponent);

  const scripts = extractor.getScriptElements();
  // const scriptTags = extractor.getScriptTags();
  const styles = extractor.getStyleElements();

  const content = renderToString(jsx);

  const htmlString = getHtmlString(content,scripts,styles);
  res.status(200).send(htmlString);
});

app.listen(port, err => {
  if (err) {
    console.error(err);
  }
  console.info('==> 🌎 Listening on port %s.', port);
});

process.on('unhandledRejection', err => {
  console.error(err);
});
process.on('uncaughtException', err => {
  console.error(err);
});
