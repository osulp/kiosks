import {SCROLL_TO_SLIDE, SET_SLIDES, SET_KIOSK, ADD_ERROR} from '../actions/kioskActions';

export const initial_state = {
  type: "touch",
  url: "kiosk/touch",
  slides: [],
  starting_slide_index: 0,
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
    case SCROLL_TO_SLIDE:
      return Object.assign({}, state, { starting_slide_index: action.index });
    default:
      return state;
  }
};

export default kioskReducer;