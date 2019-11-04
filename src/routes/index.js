import React,{createElement} from 'react';

export default [
  {
    name:'home',
    path:'/',
    component:'../pages/Home',
    exact:true,
  },
  {
    name:'login',
    path:'/login',
    component:'../pages/Login',
    exact:true
  },
  {
    name:'no',
    path:'/no/:num',
    component:'../pages/Home',
    exact:true,
  },
]