import { combineReducers } from 'redux';
import kioskReducer from './kioskReducer';

const rootReducer = combineReducers({
  kiosk: kioskReducer
});

export default rootReducer;