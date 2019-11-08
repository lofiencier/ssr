import { combineReducers } from 'redux';
import { reducer as aboutReducer } from '../pages/About/store'

export default combineReducers({
  about:aboutReducer
});
