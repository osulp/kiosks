import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Maps from './presentational/Touch/Maps';
import * as actions from '../actions';

// Top level mapping of the application state to properties of component that is being
// connected.
const mapStateToProps = (state) => {
  return {
    api: state.kiosk.api,
    google_analytics: state.kiosk.google_analytics,
    map_default_floor_number: state.kiosk.map_default_floor_number,
    maps_base_url: state.kiosk.maps_base_url
  }
};

// Map the actions to the dispatcher
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

// Connect the mappings (state -> properties, and actions -> dispatch) to the application component
export default connect(mapStateToProps, mapDispatchToProps)(Maps);
