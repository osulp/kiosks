import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ClassroomScheduleDay from './presentational/Touch/ClassroomScheduleDay';
import * as actions from '../actions';

// Top level mapping of the application state to properties of component that is being
// connected.
const mapStateToProps = (state) => {
  return {
    date: state.touch.date,
    classrooms: state.touch.classrooms,
    classroom_schedule: state.touch.classroom_schedule,
    is_fetching_classroom_schedule: state.touch.is_fetching_classroom_schedule
  }
};

// Map the actions to the dispatcher
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch);
};

// Connect the mappings (state -> properties, and actions -> dispatch) to the application component
export default connect(mapStateToProps, mapDispatchToProps)(ClassroomScheduleDay);
