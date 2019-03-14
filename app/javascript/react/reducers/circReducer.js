import {
  FETCHED_ROOMS_AVAILABLE_COUNT,
  FETCHING_ROOMS_AVAILABLE_COUNT,
  SET_ROOMS_AVAILABLE_COUNT,
  FETCHED_HOURS,
  FETCHING_HOURS,
  SET_HOURS
} from "../actions"

export const initial_state = {
  is_fetching_rooms_available_count: false,
  rooms_available_count: [0],
  date: "",
  show_nav: false,
  is_fetching_hours: false,
  hours: {}
}

const circReducer = (state = initial_state, action) => {
  switch (action.type) {
    case FETCHED_HOURS:
      return Object.assign({}, state, { is_fetching_hours: false })
    case FETCHING_HOURS:
      return Object.assign({}, state, { is_fetching_hours: true })
    case SET_HOURS:
      return Object.assign({}, state, { hours: action.hours })
    case FETCHED_ROOMS_AVAILABLE_COUNT:
      return Object.assign({}, state, {
        is_fetching_rooms_available_count: false
      })
    case FETCHING_ROOMS_AVAILABLE_COUNT:
      return Object.assign({}, state, {
        is_fetching_rooms_available_count: true
      })
    case SET_ROOMS_AVAILABLE_COUNT:
      return Object.assign({}, state, {
        date: action.data.date,
        rooms_available_count: action.data.rooms_available_count
      })
    default:
      return state
  }
}

export default circReducer
