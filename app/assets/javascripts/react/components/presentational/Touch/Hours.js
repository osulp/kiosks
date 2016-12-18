import React, {Component, PropTypes} from 'react';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/picker';
import moment from 'moment';
import HoursTable from './HoursTable';
import HoursError from './HoursError';

const now = moment();
const default_calendar_value = now.clone();
const getWeekArray = (date) => {
  return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(d => moment(date).day(d));
};

class Hours extends Component {
  dateClicked(date) {
    this.setState({selected_date: date});
    this.props.fetchHours(this.props.api.hours, getWeekArray(date));
  }

  componentWillMount() {
    this.setState({selected_date: now});
  }

  componentDidMount() {
    this.props.fetchHours(this.props.api.hours, getWeekArray(now));
  }

  _hoursContent(hours) {
    if(hours.error){
      return (<HoursError error={hours.error} />);
    } else {
      return (<HoursTable hours={hours} selected_date={this.state.selected_date} />);
    }
  }

  render() {
    let hours = this.props.hours;
    let calendar = (<Calendar defaultValue={default_calendar_value}
                              onSelect={this.dateClicked.bind(this)}
                              onChange={this.dateClicked.bind(this)}
                              showDateInput={false}/>);
    let is_fetching_class = this.props.is_fetching ? "is_fetching" : "";
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
                          defaultValue={default_calendar_value}
                          onSelect={this.dateClicked.bind(this)}
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

Hours.PropTypes = {
  hours: PropTypes.object.isRequired,
  api: PropTypes.object.isRequired,
  is_fetching_hours: PropTypes.bool.isRequired,
  fetchHours: PropTypes.func.isRequired,
};

export default Hours;
