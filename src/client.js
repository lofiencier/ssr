import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';

import App from './App';

loadableReady().then(() => {
  if (root) {
    const html =ReactDOM.hydrate(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      root
    );
    console.log('html',html);
  }
});