import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Kiosk from './presentational/Touch/Kiosk';
import * as actions from '../actions';

// Top level mapping of the application state to properties of component that is being
// connected.
const mapStateToProps = (state) => {
  return {
    slides: state.kiosk.slides,
    maps: state.touch.maps,
    hours: state.touch.hours,
    url: state.kiosk.url,
    api: state.kiosk.api,
    hours: state.touch.hours,
    classroom_schedule: state.touch.classroom_schedule,
    is_fetching_slides: state.touch.is_fetching_slides,
    is_fetching_hours: state.touch.is_fetching_hours,
    show_nav: true
  }
};

// Map the actions to the dispatcher
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

// Connect the mappings (state -> properties, and actions -> dispatch) to the application component
export default connect(mapStateToProps, mapDispatchToProps)(Kiosk);
