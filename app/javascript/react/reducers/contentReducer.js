import { SET_CONTENT_ROOT_COMPONENT } from "../actions/contentActions"

export const initial_state = {
  root_component: null
}

const contentReducer = (state = initial_state, action) => {
  switch (action.type) {
    case SET_CONTENT_ROOT_COMPONENT:
      return Object.assign({}, state, { root_component: action.root_component })
    default:
      return state
  }
}

export default contentReducer
