import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import routes from '../routes';
import { loadableReady,lazy } from '@loadable/component'

const App = () =>{
  return <BrowserRouter>
    <Switch>
      {
        routes.map(i=><Route {...i} />)
      }
    </Switch>
  </BrowserRouter>
};

loadableReady().then(()=>{
  ReactDom.hydrate(<App />,document.getElementById('root'))
})