import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Kiosk from './presentational/Tall/Kiosk';
import * as actions from '../actions';

// Top level mapping of the application state to properties of component that is being
// connected.
export const mapStateToProps = (state) => {
  return {
    slides: state.kiosk.slides,
    restart_kiosk: state.kiosk.restart_kiosk,
    url: state.kiosk.url,
    is_fetching_slides: state.touch.is_fetching_slides,
    show_nav: state.circ.show_nav,
    rooms_available_count: state.circ.rooms_available_count,
    api: state.kiosk.api,
    hours: state.touch.hours,
    is_fetching_hours: state.touch.is_fetching_hours
  }
};

// Map the actions to the dispatcher
export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

// Connect the mappings (state -> properties, and actions -> dispatch) to the application component
export default connect(mapStateToProps, mapDispatchToProps)(Kiosk);
