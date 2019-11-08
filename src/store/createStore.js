import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const createInitialStore = (initial={})=>{
  const middleWare = applyMiddleware(thunk);
  const store = createStore(reducers,initial,middleWare);
  return store;
}

export default createInitialStore;

