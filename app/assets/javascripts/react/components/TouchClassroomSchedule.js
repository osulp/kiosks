import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ClassroomSchedule from './presentational/Touch/ClassroomSchedule';
import * as actions from '../actions';

// Top level mapping of the application state to properties of component that is being
// connected.
const mapStateToProps = (state) => {
  return {
    classrooms: state.touch.classrooms,
    is_fetching_classrooms: state.touch.is_fetching_classrooms,
    api: state.kiosk.api
  }
};

// Map the actions to the dispatcher
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

// Connect the mappings (state -> properties, and actions -> dispatch) to the application component
export default connect(mapStateToProps, mapDispatchToProps)(ClassroomSchedule);