import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

import ButtonList from './presentational/Touch/ButtonList';

// Top level mapping of the application state to properties of component that is being
// connected.
export const mapStateToProps = (state) => {
  return {
    url: state.kiosk.url
  }
};

// Map the actions to the dispatcher
export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

// Connect the mappings (state -> properties, and actions -> dispatch) to the application component
export default connect(mapStateToProps, mapDispatchToProps)(ButtonList);
