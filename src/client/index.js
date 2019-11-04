import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import routes from '../routes';
import { loadableReady,lazy } from '@loadable/component'


const App = loadableReady(()=>{
  return <BrowserRouter>
    <Switch>
      <React.Suspense>
        {
          routes.map(i=><Route key={i.name} render={lazy(()=>import(i.component))} />)
        }
      </React.Suspense>
    </Switch>
  </BrowserRouter>
});

ReactDom.hydrate(<App />,document.getElementById('root'));