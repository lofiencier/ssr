import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import createStore from './store';
import { Provider } from 'react-redux';

import App from './App';

console.log('window.INITIAL_STORE',window.INITIAL_STORE);
const store = createStore(window.INITIAL_STORE||{});
console.log('store',store.getState());

loadableReady(()=>{
  const root = document.getElementById('root');
  if (root) {
    console.log('html',document.documentElement.innerHTML);
    ReactDOM.hydrate(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      root
    );
    console.log('html',document.documentElement.innerHTML);
  }
})