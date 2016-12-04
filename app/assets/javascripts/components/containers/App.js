import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SlideList from '../components/SlideList';
import * as SlideActions from '../actions/SlideActions';

// Top level mapping of the application state to properties of component that is being
// connected.
function mapStateToProps(state) {
  return {
    slides: state.slides
  }
}

// Map the actions to the dispatcher
function mapDispatchToProps(dispatch) {
  return bindActionCreators(SlideActions, dispatch);
}

// Connect the mappings (state -> properties, and actions -> dispatch) to the application component
export default connect(mapStateToProps, mapDispatchToProps)(SlideList);
