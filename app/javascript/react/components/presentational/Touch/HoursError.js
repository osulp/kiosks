import React, { Component } from "react"
import PropTypes from "prop-types"

class HoursError extends Component {
  render() {
    return (
      <p className="hours-table-error">
        <span className="glyphicon glyphicon-exclamation-sign"> </span>
        <span>{this.props.error}</span>
      </p>
    )
  }
}

HoursError.propTypes = {
  error: PropTypes.string.isRequired
}

export default HoursError
