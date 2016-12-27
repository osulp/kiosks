import React, {Component, PropTypes} from 'react';
import moment from 'moment';

class HoursTable extends Component {
  render() {
    let hours = this.props.hours;
    return (
      <table className="table hours-table">
        <thead>
        <tr>
          <th></th>
          <th>Open</th>
          <th>Close</th>
        </tr>
        </thead>
        <tbody>
        {Object.values(hours).map((h, i) => {
          return (
            <tr key={`hours.${i}`} className={moment(h.sortable_date).isSame(this.props.selected_date, "day") ? "alert alert-info" : ""}>
              <td>{h.string_date}</td>
              <td>{h.open}</td>
              <td>{h.close}</td>
            </tr>
          )
        })}
        </tbody>
      </table>);
  }
}

HoursTable.propTypes = {
  hours: PropTypes.object.isRequired,
  selected_date: PropTypes.object.isRequired,
};

export default HoursTable;