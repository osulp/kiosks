import { SET_SLIDES, REFRESH_SLIDES } from '../actions/slideActions';

const slideReducer = (state = {}, action) => {
   switch (action.type) {
    case REFRESH_SLIDES:
      return Object.assign({}, action.slides);
    case SET_SLIDES:
      return action.slides;
    default:
      return state;
  }
}

export default slideReducer;