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
          { if (hours == null) {
            } else {
            Object.values(hours).map((h, i) => {
            let formatted_hours = h.formatted_hours_plain_text
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
          })
          }
          }
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
