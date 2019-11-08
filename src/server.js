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
import { Provider }  from 'react-redux';
import createStore from './store';

import getHtmlString from './utils/getHtmlString';

import App from './App';

const port = process.env.PORT || 3000;

const app = express();

app.use(logger('dev'));
app.use(express.static('dist/',{
  setHeaders:res=>{
    res.set('Service-Worker-Allowed', '/');
  }
}));
app.get('/user',(req,res)=>{
  res.status(200).send({data:new Array(20).fill('').map((v,i)=>i)});
});
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
const componentIntoRoute =(route,loaded)=>{
  return loaded.map((component,index)=>({
    ...route[index],
    route:{
      ...route[index].route,
      ...component && {
        component:component.default
      }
    }
  }));
}
const getLoadBranchData=(branch, store, query)=>{
  return branch
    .filter(({ route }) => route.component.loadData)
    .map(({ route, match }) =>
      route.component.loadData({
        dispatch: store.dispatch,
        state: store.getState(),
        params: match.params,
        query,
        route,
      })
    );
}

const statsFile = path.resolve('dist/client/loadable-stats.json');
// const nodeStatsFile = path.resolve('dist/server/loadable-stats.json');



app.get('*', async(req,res)=>{
  const route = matchRoutes(routes,req.path)||[];
  const store = createStore();
  // script补全？这loadable有问题啊
  const loaded = await loadComponents(route);
  const routeInjected = componentIntoRoute(route,loaded);
  const loadRouteData = getLoadBranchData(routeInjected, store, req.query);
  Promise.all(loadRouteData)
    .then(async()=>{
      const keys = ['main',...route.map(i=>i.route && i.route.key)];
      const extractor = new ChunkExtractor({ statsFile, entrypoints:keys });
      
      const clientInitialStore = store.getState();
      
      const AppComponent =(
        <Provider store={store}>
          <StaticRouter location={req.path} context={{}}>
            <App />
          </StaticRouter>
        </Provider>
      );
      // const entry = extractor.requireEntrypoint();
      // console.log('entry',entry);
      const jsx = extractor.collectChunks(AppComponent);

      // const scripts = extractor.getScriptElements();
      let scriptTags = extractor.getScriptTags();
      const styles = extractor.getStyleElements();

      const content = renderToString(jsx);
      scriptTags += `<script>window.INITIAL_STORE=${JSON.stringify(clientInitialStore)}</script>`;
      const htmlString = getHtmlString(content,scriptTags,styles);
      res.status(200).send(htmlString);
    })
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
