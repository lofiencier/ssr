import { combineReducers } from 'redux';
import { reducer as aboutReducer } from '../pages/About/store';
// import { reducer as homeReducer } from '../pages/Home/store';

const reducers ={
  about:aboutReducer,
  // home:homeReducer
};
export default combineReducers(reducers);