import React, {Component, PropTypes} from 'react';

class HoursTable extends Component {
  render() {
    let hours = this.props.hours;
    return (
      <table className="table hours-table">
        <thead>
        <tr>
          <th>Day</th>
          <th>Open</th>
          <th>Close</th>
        </tr>
        </thead>
        <tbody>
        {Object.values(hours).map((h, i) => {
          return (
            <tr key={`hours.${i}`}>
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
};

export default HoursTable;
