import { combineReducers } from 'redux';
import kioskReducer from './kioskReducer';
import modalReducer from './modalReducer';
import touchReducer from './touchReducer';

export const REDUCERS_SHAPE = {
  kiosk: kioskReducer,
  modal: modalReducer,
  touch: touchReducer
};

export default combineReducers(REDUCERS_SHAPE);