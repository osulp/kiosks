import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import Error from "./presentational/shared/Error"
import * as actions from "../actions"

// Top level mapping of the application state to properties of component that is being
// connected.
export const mapStateToProps = state => {
  return {
    errors: state.kiosk.errors
  }
}

// Map the actions to the dispatcher
export const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch)
}

// Connect the mappings (state -> properties, and actions -> dispatch) to the component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Error)
