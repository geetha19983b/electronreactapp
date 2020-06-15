import { combineReducers } from 'redux';
import scriptReducer from './scriptReducer';

export default combineReducers({
   scripts: scriptReducer
});