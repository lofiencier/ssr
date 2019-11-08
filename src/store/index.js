import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

export default (initialStore={})=>{
  const middleWare = applyMiddleware(thunk);
  return createStore(reducer, initialStore, middleWare);
}