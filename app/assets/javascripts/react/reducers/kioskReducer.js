import {SCROLL_TO_SLIDE, SET_SLIDES, SET_KIOSK, ADD_ERROR, SET_TITLE, SET_GOOGLE_ANALYTICS} from '../actions/kioskActions';

export const initial_state = {
  type: "touch",
  url: "kiosk/touch",
  api: {
    hours: "/api/v1/hours",
    classroom_schedule: "/api/v1/classrooms/date/{date}",
    classrooms: "/api/v1/classrooms/rooms",
    available_rooms: "/api/v1/rooms/available/{date}"
  },
  title: "Donor Impact",
  slides: [],
  starting_slide_index: 0,
  errors: [],
  google_analytics: undefined
};

const kioskReducer = (state = initial_state, action) => {
  switch (action.type) {
    case ADD_ERROR:
      return Object.assign({}, state, { errors: [...state.errors, action.error] });
    case SET_KIOSK:
      return Object.assign({}, state, { type: action.kiosk.type, url: action.kiosk.url });
    case SET_SLIDES:
      return Object.assign({}, state, { slides: action.kiosk.slides });
    case SCROLL_TO_SLIDE:
      return Object.assign({}, state, { starting_slide_index: action.index });
    case SET_TITLE:
      return Object.assign({}, state, { title: action.title });
    case SET_GOOGLE_ANALYTICS:
      return Object.assign({}, state, { google_analytics: action.google_analytics });
    default:
      return state;
  }
};

export default kioskReducer;
