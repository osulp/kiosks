import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import Kiosk from "../components/presentational/Touch/Kiosk"
import * as actions from "../actions"

// Top level mapping of the application state to properties of component that is being
// connected.
const mapStateToProps = state => {
  return {
    slides: state.slides,
    restart_kiosk: state.restart_kiosk
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
)(Kiosk)
