import React, { Component } from "react"
import PropTypes from "prop-types"
import moment from "moment"
import MyImage from 'images/osu_campus_map.png'

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
      <img src={MyImage} alt="Test" height="120%" width="53%" />
    )
  }
}

CampusMap.propTypes = {
}

export default CampusMap
