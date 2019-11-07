import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';

import App from './App';

loadableReady(()=>{
  const root = document.getElementById('root');
  if (root) {
    console.log('html',document.documentElement.innerHTML);
    ReactDOM.hydrate(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      root
    );
    console.log('html',document.documentElement.innerHTML);
  }
})