import {
  FETCHED_ROOMS_AVAILABLE_COUNT, FETCHING_ROOMS_AVAILABLE_COUNT, SET_ROOMS_AVAILABLE_COUNT
} from '../actions/circActions';

export const initial_state = {
  is_fetching_rooms_available_count: false,
  rooms_available_count: [0],
  date: '',
  show_nav: false
};

const circReducer = (state = initial_state, action) => {
  switch (action.type) {
    case FETCHED_ROOMS_AVAILABLE_COUNT:
      return Object.assign({}, state, {is_fetching_rooms_available_count: false});
    case FETCHING_ROOMS_AVAILABLE_COUNT:
      return Object.assign({}, state, {is_fetching_rooms_available_count: true});
    case SET_ROOMS_AVAILABLE_COUNT:
      return Object.assign({}, state, {date: action.data.date, rooms_available_count: action.data.rooms_available_count});
    default:
      return state;
  }
};

export default circReducer;
