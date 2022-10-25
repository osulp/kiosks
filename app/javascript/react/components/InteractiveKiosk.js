import { bindActionCreators } from "redux"
import { connect } from "react-redux"

import Kiosk from "./presentational/Interactive/Kiosk"
import * as actions from "../actions"

// Top level mapping of the application state to properties of component that is being
// connected.
const mapStateToProps = state => {
  return {
    slides: state.kiosk.slides,
    restart_kiosk: state.kiosk.restart_kiosk,
    maps: state.touch.maps,
    maps_base_url: state.kiosk.maps_base_url,
    map_default_floor_number: state.kiosk.map_default_floor_number,
    kiosk_name: state.kiosk.name,
    kiosk_id: state.kiosk.kid,
    url: state.kiosk.url,
    google_analytics: state.kiosk.google_analytics,
    api: state.kiosk.api,
    classroom_schedule: state.touch.classroom_schedule,
    is_fetching_slides: state.touch.is_fetching_slides,
    is_fetching_hours: state.touch.is_fetching_hours,
    show_nav: state.touch.show_nav
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
