import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ButtonList from './presentational/Touch/ButtonList';
import { fetchSlides } from '../actions/touchActions';

// Top level mapping of the application state to properties of component that is being
// connected.
const mapStateToProps = (state) => {
  return {
    url: state.kiosk.url
  }
};

// Map the actions to the dispatcher
const mapDispatchToProps = (dispatch) => {
  return {
    fetchSlides: fetchSlides
  }
};

// Connect the mappings (state -> properties, and actions -> dispatch) to the application component
export default connect(mapStateToProps, mapDispatchToProps)(ButtonList);
