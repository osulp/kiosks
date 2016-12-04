import { combineReducers } from 'redux';
import slidesReducer from './slidesReducer';

const rootReducer = combineReducers({
  slides: slidesReducer
});

export default rootReducer;