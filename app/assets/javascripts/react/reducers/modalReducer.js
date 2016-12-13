import {SET_MODAL_ROOT_COMPONENT, SET_MODAL_VISIBILITY} from '../actions/modalActions';

export const initial_state = {
  visible: false,
  root_component: null
};

const modalReducer = (state = initial_state, action) => {
  switch (action.type) {
    case SET_MODAL_VISIBILITY:
      return Object.assign({}, state, { visible: action.visible });
    case SET_MODAL_ROOT_COMPONENT:
      return Object.assign({}, state, { root_component: action.root_component });
    default:
      return state;
  }
};

export default modalReducer;