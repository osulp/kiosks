import { combineReducers } from 'redux';
import kioskReducer from './kioskReducer';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
  kiosk: kioskReducer,
  modal: modalReducer
});

export default rootReducer;