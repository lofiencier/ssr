import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

export default (initialStore={})=>{
  console.log('initialStore',initialStore);
  const middleWare = applyMiddleware(thunk);
  console.log('???',createStore(()=>({about:{}}),{ about:{loading:111} },middleWare).getState());
  return createStore(reducer, initialStore, middleWare);
}