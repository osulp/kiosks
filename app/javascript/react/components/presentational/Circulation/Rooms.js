import React, { Component } from "react"
import PropTypes from "prop-types"
import moment from "moment"

class Rooms extends Component {
  /**
   * Automatically fetch rooms available timeout after 10 seconds
   */
  setRefreshTimeout() {
    const refresh = () => {
      let now = moment()
      this.props.fetchRoomsAvailableCount(this.props.api.available_rooms, now)
      this.setRefreshTimeout()
      this.setFlipCounter()
    }
    this.refresh_timeout = setTimeout(refresh, 2 * 60 * 1000)
  }

  setFlipCounter() {
    let rooms_available = this.props.rooms_available_count
    let rooms_count = rooms_available.length ? rooms_available.length : 0
  }

  /**
   * After the component has mounted, fetch the rooms available given a date
   */
  componentDidMount() {
    let now = moment().format()

    this.props.fetchRoomsAvailableCount(this.props.api.available_rooms, now)
    this.setRefreshTimeout()

    let rooms_available = this.props.rooms_available_count
    let rooms_count = rooms_available.length ? rooms_available.length : 0
  }

  /**
   * As the component is unmounting, clear the hide timeout
   */
  componentWillUnmount() {
    clearTimeout(this.refresh_timeout)
  }

  render() {
    let rooms_available = this.props.rooms_available_count
    let rooms_count = rooms_available.length ? rooms_available.length : 0

    return (
      <div className="navbar-wrapper">
        <div className="circ-sidebar-title">Study Rooms Available</div>
        <div className="circ-counter" />
      </div>
    )
  }
}

Rooms.propTypes = {
  url: PropTypes.string.isRequired,
  rooms_available_count: PropTypes.array.isRequired,
  fetchRoomsAvailableCount: PropTypes.func.isRequired,
  api: PropTypes.object.isRequired
}

export default Rooms
