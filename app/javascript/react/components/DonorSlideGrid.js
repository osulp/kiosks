import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import SlideGrid from "./presentational/Donor/SlideGrid"
import * as actions from "../actions"

// Top level mapping of the application state to properties of component that is being
// connected.
export const mapStateToProps = state => {
  return {
    slides: state.kiosk.slides,
    kiosk_name: state.kiosk.name,
    kiosk_id: state.kiosk.kid,
    title: state.kiosk.title,
    is_modal_visible: state.modal.visible
  }
}

// Map the actions to the dispatcher
export const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch)
}

// Connect the mappings (state -> properties, and actions -> dispatch) to the application component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SlideGrid)
