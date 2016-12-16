import React, {Component, PropTypes} from 'react';
import Calendar from 'rc-calendar';
import moment from 'moment';
import HoursTable from './HoursTable';
import HoursError from './HoursError';

const now = moment();
const default_calendar_value = now.clone();
const getWeekArray = (date) => {
  return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(d => moment(date).day(d));
}

class Hours extends Component {
  dateClicked(date) {
    this.props.fetchHours(this.props.api.hours, getWeekArray(date));
  }

  componentDidMount() {
    this.props.fetchHours(this.props.api.hours, getWeekArray(now));
  }

  render() {
    let hours = this.props.hours;
    return (
      <div id="hours" className="panel panel-default">
        <div className="panel-heading">
          <span className="panel-title">Library Hours</span>
          <span className={`glyphicon glyphicon-repeat ${this.props.is_fetching_hours ? "is_fetching" : ""}`}
                aria-hidden="true">&nbsp;</span></div>
        <div className="hours-table-container">
          <table className="table hours-container">
            <tbody>
            <tr>
              <td>
                {hours.error ? <HoursError error={hours.error}/> : <HoursTable hours={hours}/>}
              </td>
              <td>
                <Calendar
                  defaultValue={default_calendar_value}
                  onSelect={this.dateClicked.bind(this)}
                  onChange={this.dateClicked.bind(this)}
                  showDateInput={false}/>
              </td>
            </tr>
            </tbody>
          </table>
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
