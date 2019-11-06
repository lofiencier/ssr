import express from 'express';
import favicon from 'serve-favicon';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import routes from 'routes';
import path from 'path';

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

const statsFile = path.resolve('dist/server/loadable-stats.json');

app.get('*', async(req,res)=>{
  const route = matchRoutes(routes,req.path);
  const loaded = await loadComponents(route);

  Promise.all(loaded)
    .then(async()=>{
      const AppComponent =(
        <StaticRouter>
          <App />
        </StaticRouter>
      );
      const extractor = new ChunkExtractor({ statsFile });
      const jsx = extractor.collectChunks(AppComponent);
      const scripts = extractor.getScriptElements();
      const content = renderToString(jsx);
      const htmlString = getHtmlString(content,scripts);

      const document = `<!doctype html>${htmlString}`;
      res.status(200).send(document);
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
