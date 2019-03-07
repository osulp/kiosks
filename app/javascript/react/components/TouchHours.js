import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import Hours from "./presentational/Touch/Hours"
import * as actions from "../actions"

// Top level mapping of the application state to properties of component that is being
// connected.
const mapStateToProps = state => {
  return {
    api: state.kiosk.api,
    hours: state.touch.hours,
    google_analytics: state.kiosk.google_analytics,
    is_fetching_hours: state.touch.is_fetching_hours,
    kiosk_name: state.kiosk.name,
    kiosk_id: state.kiosk.kid
  }
}

// Map the actions to the dispatcher
const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch)
}

// Connect the mappings (state -> properties, and actions -> dispatch) to the application component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Hours)
