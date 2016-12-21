import {FETCHED_SLIDES, FETCHING_SLIDES, FETCHED_HOURS, FETCHING_HOURS, SET_HOURS, SET_MAPS} from '../actions/touchActions';

export const initial_state = {
  is_fetching_slides: false,
  is_fetching_hours: false,
  hours: {},
  maps: []
};

const touchReducer = (state = initial_state, action) => {
  switch (action.type) {
    case FETCHED_SLIDES:
      return Object.assign({}, state, { is_fetching_slides: false });
    case FETCHING_SLIDES:
      return Object.assign({}, state, { is_fetching_slides: true });
    case FETCHED_HOURS:
      return Object.assign({}, state, { is_fetching_hours: false });
    case FETCHING_HOURS:
      return Object.assign({}, state, { is_fetching_hours: true });
    case SET_HOURS:
      return Object.assign({}, state, { hours: action.hours });
    case SET_MAPS:
      return Object.assign({}, state, { maps: action.maps });
    default:
      return state;
  }
};

export default touchReducer;