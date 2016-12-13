import {FETCHED_SLIDES, FETCHING_SLIDES} from '../actions/touchActions';

export const initial_state = {
  is_fetching: false
};

const touchReducer = (state = initial_state, action) => {
  switch (action.type) {
    case FETCHED_SLIDES:
      return Object.assign({}, state, { is_fetching: false });
    case FETCHING_SLIDES:
      return Object.assign({}, state, { is_fetching: true });
    default:
      return state;
  }
};

export default touchReducer;