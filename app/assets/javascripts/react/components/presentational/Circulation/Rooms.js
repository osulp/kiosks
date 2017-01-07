import React, {Component, PropTypes} from 'react';
import moment from 'moment';

export const now = moment();

class Rooms extends Component {
  /**
   * Automatically fetch rooms available timeout after 10 seconds
   */
  setRefreshTimeout() {
    const refresh = () => {
      this.props.fetchRoomsAvailableCount("/api/v1/rooms/available/{date}", now);
      this.setRefreshTimeout();
      this.setFlipCounter();
    };
    this.refresh_timeout = setTimeout(refresh, 10000);
  }

  setFlipCounter() {
    let rooms_available = this.props.rooms_available_count;
    let rooms_count = rooms_available.length ? rooms_available.length : 0;
    this.clock.setValue(rooms_count);
  }

  /**
   * After the component has mounted, fetch the rooms available given a date
   */
  componentDidMount() {
    this.props.fetchRoomsAvailableCount("/api/v1/rooms/available/{date}", now);
    this.setRefreshTimeout();

    let rooms_available = this.props.rooms_available_count;
    let rooms_count = rooms_available.length ? rooms_available.length : 0;
  }

  /**
   * As the component is unmounting, clear the hide timeout
   */
  componentWillUnmount() {
    clearTimeout(this.refresh_timeout);
  }

  render() {
    let rooms_available = this.props.rooms_available_count;
    let rooms_count = rooms_available.length ? rooms_available.length : 0;

    this.clock = new FlipClock($('.circ-counter'), rooms_count, {
      clockFace: 'Counter'
    });
    return (
      <div className="navbar-wrapper">
        <div className="circ-sidebar-title">Study Rooms Available</div>
        <div className="circ-counter"></div>
      </div>
    );
  }
}

Rooms.propTypes = {
  url: PropTypes.string.isRequired,
  rooms_available_count: PropTypes.array.isRequired,
  fetchRoomsAvailableCount: PropTypes.func.isRequired
};

export default Rooms;
