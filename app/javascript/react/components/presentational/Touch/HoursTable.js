import React, { Component } from "react"
import PropTypes from "prop-types"
import moment from "moment"

class HoursTable extends Component {
  render() {
    return (
      <table className="table hours-table">
        <thead>
          <tr>
            <th />
            <th>Hours</th>
          </tr>
        </thead>
        <tbody>
        <tr>
        <td>
        </td>
        </tr>
        </tbody>
      </table>
    )
  }
}

HoursTable.propTypes = {
  hours: PropTypes.object.isRequired,
  selected_date: PropTypes.object.isRequired
}

export default HoursTable
