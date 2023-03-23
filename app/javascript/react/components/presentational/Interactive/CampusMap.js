import React, { Component } from "react"
import PropTypes from "prop-types"
import moment from "moment"

class CampusMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      taps: 0,
      selected_item: "home"
    }
  }

  render() {
    return (
      <iframe src="https://map.oregonstate.edu" height="100%" width="100%"></iframe>
    )
  }
}

CampusMap.propTypes = {
}

export default CampusMap
