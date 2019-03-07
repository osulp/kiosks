export const SET_MODAL_VISIBILITY = "SET_MODAL_VISIBILITY"
export const setModalVisibility = visible => {
  return {
    type: SET_MODAL_VISIBILITY,
    visible
  }
}

export const SET_MODAL_ROOT_COMPONENT = "SET_MODAL_ROOT_COMPONENT"
export const setModalRootComponent = root_component => {
  return {
    type: SET_MODAL_ROOT_COMPONENT,
    root_component
  }
}
