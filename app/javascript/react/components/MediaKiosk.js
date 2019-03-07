import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import Kiosk from "./presentational/Media/Kiosk"
import * as actions from "../actions"

// Top level mapping of the application state to properties of component that is being
// connected.
export const mapStateToProps = state => {
  return {
    slides: state.kiosk.slides,
    restart_kiosk: state.kiosk.restart_kiosk,
    kiosk_name: state.kiosk.name,
    kiosk_id: state.kiosk.kid,
    url: state.kiosk.url,
    title: state.kiosk.title,
    google_analytics: state.kiosk.google_analytics
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
)(Kiosk)
