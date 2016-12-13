import { combineReducers } from 'redux';
import kioskReducer from './kioskReducer';
import modalReducer from './modalReducer';
import touchReducer from './touchReducer';

const rootReducer = combineReducers({
  kiosk: kioskReducer,
  modal: modalReducer,
  touch: touchReducer
});

export default rootReducer;