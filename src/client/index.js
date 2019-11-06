import React from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import { loadableReady,lazy } from '@loadable/component'
import Routes from '../App';

const App = () =>{
  return <BrowserRouter>
    <Routes />
  </BrowserRouter>
};

loadableReady().then(()=>{
  ReactDom.hydrate(<App />,document.getElementById('root'))
})