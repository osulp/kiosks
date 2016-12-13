import React, {Component, PropTypes} from 'react';

class Hours extends Component {
  render() {
    let hours = this.props.hours;
    return (
      <div className="panel panel-default">
        <div className="panel-heading">Library Hours</div>
        <div className="panel-body">
          <p>Some explanation of the hours here?</p>
        </div>
        <table className="table">
          {hours.map((h) => {return (
            <tr>
              <td>{h.day}</td>
              <td>{h.from}</td>
              <td>{h.to}</td>
            </tr>
          )})}
        </table>
      </div>
    );
  }
}

Hours.PropTypes = {
  hours: PropTypes.array.isRequired,
};

export default Hours;
