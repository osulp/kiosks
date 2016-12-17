import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export const createStoreWithMiddleware = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const configureStore = (initialState) => {
  return createStoreWithMiddleware(rootReducer, initialState);
};

export default configureStore;