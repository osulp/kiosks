import {SET_SLIDES, SET_KIOSK, ADD_ERROR} from '../actions/kioskActions';

export const initial_state = {
  type: "touch",
  url: "kiosk/touch",
  slides: [],
  errors: []
};

const kioskReducer = (state = initial_state, action) => {
  switch (action.type) {
    case ADD_ERROR:
      return Object.assign({}, state, { errors: [...state.errors, action.error] });
    case SET_KIOSK:
      return Object.assign({}, state, { type: action.kiosk.type, url: action.kiosk.url });
    case SET_SLIDES:
      return Object.assign({}, state, { slides: action.kiosk.slides });
    default:
      return state;
  }
};

export default kioskReducer;