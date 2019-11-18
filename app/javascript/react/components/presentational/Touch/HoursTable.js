import React, { Component } from "react"
import PropTypes from "prop-types"
import moment from "moment"

class HoursTable extends Component {
  render() {
    let hours = this.props.hours
    return (
      <table className="table hours-table">
        <thead>
          <tr>
            <th />
            <th>Hours</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(hours).map((h, i) => {
            let formatted_hours = h.formatted_hours
            if (formatted_hours != undefined) {
              // I'm replacing html br tag with a comma to keep the component clean or in one line. TODO: I think we should
              // introduce a non-HTML formatted_hours field in the API, and rended it
              // here. Related work: https://github.com/osulp/API/pull/89
              formatted_hours = formatted_hours.replace('<br>',', ')
            }
            return (
              <tr
                key={`hours.${i}`}
                className={
                  moment(h.sortable_date).isSame(
                    this.props.selected_date,
                    "day"
                  )
                    ? "alert alert-info"
                    : ""
                }
              >
                <td>{h.string_date}</td>
                <td>{formatted_hours}</td>
                <td>{h.event_desc}</td>
              </tr>
            )
          })}
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
