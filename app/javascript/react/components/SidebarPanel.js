import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import TabbedPanel from "./presentational/shared/SidebarPanel"
import * as actions from "../actions"

// Top level mapping of the application state to properties of component that is being
// connected.
export const mapStateToProps = state => {
  return {}
}

// Map the actions to the dispatcher
export const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch)
}

// Connect the mappings (state -> properties, and actions -> dispatch) to the component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabbedPanel)
