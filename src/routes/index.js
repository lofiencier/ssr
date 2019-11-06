import React from 'react';
import loadable from '@loadable/component';
import {Route,Switch} from 'react-router-dom';

const Home = loadable(()=>import('../pages/Home'));

export default [{
  path:'/',
  component:Home,
  key:'home'
}];
