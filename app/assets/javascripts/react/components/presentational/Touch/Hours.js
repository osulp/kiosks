import React, {Component, PropTypes} from 'react';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker';
import moment from 'moment';
import HoursTable from './HoursTable';
import HoursError from './HoursError';
import {trackClicked} from '../shared/GoogleAnalytics';

export const getWeekArray = (date) => {
  return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(d => moment(date).day(d).format('YYYY-MM-DD'));
};

class Hours extends Component {
  /**
   * Initialize an hours UI and set the initial state to display "today"
   * @param props - the properties passed into the component
   */
  constructor(props) {
    super(props);
    let now = moment();
    this.state = {selected_date: now};
  }

  /**
   * Set the modal to automatically hide itself after a period of time, unless the timeout is cleared beforehand
   */
  setHideTimeout() {
    this.hide_timeout = setInterval(() => {
      this.props.setModalRootComponent(undefined);
      this.props.setModalVisibility(false);
    }, 2*10*1000);
  }

  /**
   * Change the component to display the date that was clicked, and reset the hide timeout.
   * @param {Moment} date - the date that was clicked
   */
  dateClicked(date) {
    trackClicked(this.props.google_analytics, 'TouchKiosk:Hours:Date');
    this.setState({selected_date: date});
    this.props.fetchHours(this.props.api.hours, getWeekArray(date));
    clearInterval(this.hide_timeout);
    this.setHideTimeout();
  }

  /**
   * After the component mounts, fetch a weeks worth of hours for the date that was selected (defaulting to 'now')
   */
  componentDidMount() {
    this.setHideTimeout();
    this.props.fetchHours(this.props.api.hours, getWeekArray(moment().format('YYYY-MM-DD')));
  }

  /**
   * Before the component unmounts, clear the hide timeout
   */
  componentWillUnmount() {
    this.props.fetchHours(this.props.api.hours, [moment().format('YYYY-MM-DD')]);
    clearInterval(this.hide_timeout);
  }

  /**
   * Render the hours table or error depending on the result of fetching the hours
   * @param {Object} hours - the hours returned from the server
   * @returns {JSX} - the HoursTable or HoursError depending on the servers return
   * @private
   */
  _hoursContent(hours) {
    if (hours.error) {
      return (<HoursError error={hours.error}/>);
    } else {
        if(typeof this.state.selected_date == 'string') {
            return (<HoursTable hours={hours} selected_date={moment(this.state.selected_date)}/>);
        } else {
            return (<HoursTable hours={hours} selected_date={this.state.selected_date}/>);
        }
    }
  }

  /**
   * Includes Bootstrap elements for mobile and regular displays using hidden-*  and col-* semantics
   * @returns {JSX} - the rendered UI
   */
  render() {
    let hours = this.props.hours;
    let calendar = (<Calendar defaultValue={this.state.selected_date}
                              onChange={this.dateClicked.bind(this)}
                              showDateInput={false}/>);
    let is_fetching_class = this.props.is_fetching_hours ? "is_fetching" : "";
    return (
      <div id="hours" className="panel panel-default">
        <div className="panel-heading">
          <span className="panel-title">Library Hours</span>
          <span className={`glyphicon glyphicon-repeat ${is_fetching_class}`} aria-hidden="true">&nbsp;</span>
        </div>
        <div className="container-fluid hours-table-container">
          <div className="row">
            <div className="hours-table-datepicker hidden-md hidden-lg col-sm-12">
              <DatePicker calendar={calendar}
                          animation="slide-down"
                          defaultValue={this.state.selected_date}
                          onChange={this.dateClicked.bind(this)}
                          showDateInput={false}>
                {({value}) => {
                  return (
                    <span tabIndex="0">
                      <label htmlFor="hours_date_picker">Select a Date:</label>
                      <input id="hours_date_picker"
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
            <div className="col-md-5 col-sm-12">{this._hoursContent(hours)}</div>
            <div className="hidden-sm hidden-xs col-md-7">{calendar}</div>
          </div>
        </div>
      </div>
    );
  }
}

Hours.propTypes = {
  hours: PropTypes.object.isRequired,
  api: PropTypes.object.isRequired,
  google_analytics: PropTypes.func,
  is_fetching_hours: PropTypes.bool.isRequired,
  fetchHours: PropTypes.func.isRequired,
};

export default Hours;
