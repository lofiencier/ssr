import React from 'react';
import loadable from '@loadable/component';

export default [
  {
    path: '/',
    component: loadable(()=>import(/* webpackChunkName: "home" */'./pages/Home')),
    key:"home",
    routes: [
      {
        path: '/',
        component: loadable(()=>import(/* webpackChunkName: "empty" */'./pages/Empty')),
        key:'empty',
        exact:true
      },
      {
        path: '/about',
        component: loadable(()=>import(/* webpackChunkName: "about" */'./pages/About')),
        key:'about',
        exact:true
      },
      {
        path: '/envy',
        component: loadable(()=>import(/* webpackChunkName: "envy" */'./pages/Envy')),
        key:'envy',
        exact:true
      },
    ],
  },
];
