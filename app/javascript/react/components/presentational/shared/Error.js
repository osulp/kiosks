import { connect } from "react-redux"
import React, { Component } from "react"
import PropTypes from "prop-types"

class Error extends Component {
  render() {
    return (
      <div id="error">
      </div>
    )
  }
}

Error.propTypes = {
  errors: PropTypes.array
}

export default Error
