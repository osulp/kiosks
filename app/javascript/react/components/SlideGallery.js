import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import SlideGallery from "./presentational/shared/SlideGallery"
import * as actions from "../actions"

// Top level mapping of the application state to properties of component that is being
// connected.
export const mapStateToProps = state => {
  return {
    slides: state.kiosk.slides,
    starting_slide_index: state.kiosk.starting_slide_index
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
)(SlideGallery)
