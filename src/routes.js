import React from 'react';
import loadable from '@loadable/component';

export default [
  {
    path: '/',
    component: loadable(()=>import(/* webpackPrefetch: true */ './pages/Home')),
    key:"home",
    // routes: [
    //   {
    //     path: '/',
    //     isLoggedIn: false,
    //     component: Landing,
    //   },
    // ],
  },
];
