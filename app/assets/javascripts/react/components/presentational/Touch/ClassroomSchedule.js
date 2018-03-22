import React, {Component, PropTypes} from 'react';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import moment from 'moment';
import ConnectedClassroomScheduleDay from '../../TouchClassroomScheduleDay';
import {trackClicked} from '../shared/GoogleAnalytics';

class ClassroomSchedule extends Component {
  /**
   * Initialize a classroom schedule UI and set the initial state to display "today"
   * @param props - the properties passed into the component
   */
  constructor(props) {
    super(props);
    let now = moment();
    this.state = {selected_date: now};
  }

  /**
   * Automatically hide the classroom schedule after a period of inactivity
   */
  setHideTimeout() {
    const hide = () => {
      this.props.setModalRootComponent(undefined);
      this.props.setModalVisibility(false);
    };
    this.hide_timeout = setTimeout(hide, 120000);
  }

  /**
   * When the classroom filter element is clicked, fire off an action to propagate the change through the app state
   * @param {Object} classroom - the classroom which was clicked
   */
  classroomClicked(classroom) {
    trackClicked(this.props.google_analytics, 'TouchKiosk:ClassroomSchedule:Classroom');
    this.props.toggleClassroomSelected(classroom.shortname, classroom.selected);
  }

  /**
   * When a date on the calendar is clicked, fetch the schedule for that day and reset the hide timeout
   * @param {Moment} date - the date clicked
   */
  dateClicked(date) {
    trackClicked(this.props.google_analytics, 'TouchKiosk:ClassroomSchedule:Date');
    this.setState({selected_date: date});
    this.props.fetchClassroomSchedule(this.props.api.classroom_schedule, date);
    clearTimeout(this.hide_timeout);
    this.setHideTimeout();
  }

  /**
   * After the component has mounted, fetch the classroom list and the current days schedule
   */
  componentDidMount() {
    this.props.fetchClassrooms(this.props.api.classrooms);
    this.props.fetchClassroomSchedule(this.props.api.classroom_schedule, this.state.selected_date);
    this.setHideTimeout();
  }

  /**
   * As the component is unmounting, clear the hide timeout
   */
  componentWillUnmount() {
    clearTimeout(this.hide_timeout);
  }

  /**
   * Sort the list of classrooms by their keys
   * @returns {Array} - sorted list of classrooms
   * @private
   */
  _sortedClassrooms() {
    const ordered = [];
    Object.keys(this.props.classrooms).sort().forEach((k) => ordered.push(this.props.classrooms[k]));
    return ordered;
  }

  _hasSelectedClassroom(element, index, array) {
    return element.selected === true;
  }

  /**
   * Includes Bootstrap elements for mobile and regular displays using hidden-*  and col-* semantics
   * @returns {JSX} - the rendered UI
   */
  render() {
    const calendar = (<Calendar defaultValue={this.state.selected_date}
                                onChange={this.dateClicked.bind(this)}
                                showDateInput={false}/>);
    const is_fetching_class = this.props.is_fetching_classroom_schedule ? "is_fetching" : "";
    const date = this.state.selected_date.format('dddd, MMMM Do, YYYY');
    const classrooms = this._sortedClassrooms();
    return (
      <div id="classroom_schedule" className="panel panel-default">
        <div className="panel-heading">
          <span className="panel-title">Library Classrooms Schedule</span>
          <span className={`glyphicon glyphicon-repeat ${is_fetching_class}`} aria-hidden="true">&nbsp;</span>
        </div>
        <div className="container-fluid classroom-schedule-table-container">
          <div className="row">
            <h2>{date}</h2>
            <div className="classroom-schedule-table-datepicker hidden-md hidden-lg col-sm-12">
              <DatePicker calendar={calendar}
                          animation="slide-down"
                          defaultValue={this.state.selected_date}
                          onChange={this.dateClicked.bind(this)}
                          showDateInput={false}>
                {({value}) => {
                  return (
                    <span tabIndex="0">
                      <label htmlFor="classroom_schedule_date_picker">Select a Date:</label>
                      <input id="classroom_schedule_date_picker"
                             placeholder="Select a date."
                             style={{width: 250}}
                             readOnly
                             tabIndex="-1"
                             className="ant-calendar-picker-input ant-input"
                             value={value && value.format('YYYY-MM-DD') || ''}/>
                    </span>
                  );
                }}
              </DatePicker>
            </div>
            <div className="hidden-sm hidden-xs col-md-9 classroom-filter">
              <ul>
                <li key="filter.classroom_schedule" >Filter Schedule:</li>
                {classrooms.map((classroom) => {
                  let selected = classrooms.some(this._hasSelectedClassroom) ? classroom.selected : true;
                  return (
                    <li key={classroom.shortname}
                        className={`${classroom.shortname} ${classroom.selected ? "selected" : ""}`}
                        data-shortname={classroom.shortname}
                        data-selected={selected}
                        onClick={this.classroomClicked.bind(this, classroom)}>
                      <span className={`glyphicon glyphicon-ok-sign ${classroom.selected ? "checked" : ""}`}
                            aria-hidden="true">
                        &nbsp;
                      </span>
                      {classroom.title}
                    </li>);
                })}
              </ul>
            </div>
            <div className="col-md-9 col-sm-12">
              <ConnectedClassroomScheduleDay />
            </div>
            <div className="hidden-sm hidden-xs col-md-3">{calendar}</div>
          </div>
        </div>
      </div>
    );
  }
}

ClassroomSchedule.propTypes = {
  classrooms: PropTypes.object.isRequired,
  api: PropTypes.object.isRequired,
  google_analytics: PropTypes.func,
  is_fetching_classroom_schedule: PropTypes.bool.isRequired,
  fetchClassroomSchedule: PropTypes.func.isRequired,
  fetchClassrooms: PropTypes.func.isRequired,
  toggleClassroomSelected: PropTypes.func.isRequired,
};

export default ClassroomSchedule;
