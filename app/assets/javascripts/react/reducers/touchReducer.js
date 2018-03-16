import {
  FETCHED_SLIDES, FETCHING_SLIDES, FETCHED_RESTART_KIOSK, FETCHING_RESTART_KIOSK, FETCHED_HOURS, FETCHING_HOURS, SET_HOURS, SET_MAPS,
  FETCHED_CLASSROOM_SCHEDULE, FETCHING_CLASSROOM_SCHEDULE, SET_CLASSROOM_SCHEDULE,
  FETCHED_CLASSROOMS, FETCHING_CLASSROOMS, TOGGLE_CLASSROOM_SELECTED, FETCHED_TODAYS_HOURS, FETCHING_TODAYS_HOURS, SET_TODAYS_HOURS
} from '../actions/touchActions';

export const initial_state = {
  is_fetching_slides: false,
  is_fetching_restart_kiosk: false,
  is_fetching_hours: false,
  is_fetching_todays_hours: false,
  is_fetching_classroom_schedule: false,
  is_fetching_classrooms: false,
  hours: {},
  todays_hours: {},
  classroom_schedule: {},
  classrooms: {},
  date: '',
  maps: [],
  show_nav: true
};

const touchReducer = (state = initial_state, action) => {
  let classrooms = [];
  switch (action.type) {
    case FETCHED_RESTART_KIOSK:
      return Object.assign({}, state, {is_fetching_restart_kiosk: false});
    case FETCHING_RESTART_KIOSK:
      return Object.assign({}, state, {is_fetching_restart_kiosk: true});
    case FETCHED_SLIDES:
      return Object.assign({}, state, {is_fetching_slides: false});
    case FETCHING_SLIDES:
      return Object.assign({}, state, {is_fetching_slides: true});
    case FETCHED_HOURS:
      return Object.assign({}, state, {is_fetching_hours: false});
    case FETCHING_HOURS:
      return Object.assign({}, state, {is_fetching_hours: true});
    case SET_HOURS:
      return Object.assign({}, state, {hours: action.hours});
    case FETCHED_TODAYS_HOURS:
      return Object.assign({}, state, {is_fetching_todays_hours: false});
    case FETCHING_TODAYS_HOURS:
      return Object.assign({}, state, {is_fetching_todays_hours: true});
    case SET_TODAYS_HOURS:
      return Object.assign({}, state, {todays_hours: action.todays_hours});
    case FETCHED_CLASSROOM_SCHEDULE:
      return Object.assign({}, state, {is_fetching_classroom_schedule: false});
    case FETCHING_CLASSROOM_SCHEDULE:
      return Object.assign({}, state, {is_fetching_classroom_schedule: true});
    case SET_CLASSROOM_SCHEDULE:
      return Object.assign({}, state, {date: action.data.date, classroom_schedule: action.data.classroom_schedule});
    case SET_MAPS:
      return Object.assign({}, state, {maps: action.maps});
    case FETCHED_CLASSROOMS:
      return Object.assign({}, state, {is_fetching_classrooms: false, classrooms: action.classrooms});
    case FETCHING_CLASSROOMS:
      return Object.assign({}, state, {is_fetching_classrooms: true});
    case TOGGLE_CLASSROOM_SELECTED:
      let classrooms = Object.assign({}, state.classrooms);
      classrooms[action.data.shortname].selected = !action.data.selected;
      return Object.assign({}, state, {classrooms});
    default:
      return state;
  }
};

export default touchReducer;
