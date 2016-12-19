import React, {Component, PropTypes} from 'react';
import Calendar from 'rc-calendar';
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

  render() {
    let hours = this.props.hours;
    return (
      <div id="hours" className="panel panel-default">
        <div className="panel-heading">
          <span className="panel-title">Library Hours</span>
          <span className={`glyphicon glyphicon-repeat ${this.props.is_fetching_hours ? "is_fetching" : ""}`}
                aria-hidden="true">&nbsp;</span></div>
        <div className="container-fluid hours-table-container">
          <div className="row">
            <div className="col-md-5">
              {hours.error ? <HoursError error={hours.error}/> : <HoursTable hours={hours} selected_date={this.state.selected_date} />}
            </div>
            <div className="col-md-7">
              <Calendar
                defaultValue={default_calendar_value}
                onSelect={this.dateClicked.bind(this)}
                onChange={this.dateClicked.bind(this)}
                showDateInput={false}/>
            </div>
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
