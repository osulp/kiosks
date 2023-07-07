import React, { Component } from "react"
import PropTypes from "prop-types"
import moment from "moment"

class HoursTable extends Component {
  render() {
		let hours = {"2000-01-01": {
			open: "error",
    	close: "error",
    	string_date: "error",
    	sortable_date: "2000-01-01",
			event_desc: "error",
			formatted_hours: "error"	
		}}
		if (this.props.hours != null || this.props.hours != "") {
			hours = this.props.hours
		}
    return (
      <table className="table hours-table">
        <thead>
          <tr>
            <th />
            <th>Hours</th>
          </tr>
        </thead>
        <tbody>
				{ Object.values(hours).map((h, i) => {
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
