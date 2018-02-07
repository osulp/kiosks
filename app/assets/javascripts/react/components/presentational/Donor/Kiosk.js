import {connect} from 'react-redux';
import React, {Component, PropTypes} from 'react';
import ConnectedModalWindow from '../../ModalWindow';
import ConnectedSlideGrid from '../../DonorSlideGrid';
import moment from 'moment';

class Kiosk extends Component {
  /**
   * After the component mounts, fetch the restart_kiosk value
   */
  componentDidMount() {
    this._fetchRestartKioskTimeout();
  }

  /**
   * Before the component unmounts, clear the timeouts.
   */
  componentWillUnmount() {
    clearInterval(this.restart_kiosk_timeout);
  }

  /**
   * Fetch the restart_kiosk value for donor kiosk every 1 minute in order to restart the kiosk as scheduled
   * @private
   */
  _fetchRestartKioskTimeout() {
    this.restart_kiosk_timeout = setInterval(() => {
      this.props.fetchRestartKiosk(this.props.url);
    }, 1 * 60 * 1000);
  }

  render() {
    return (
      <div id="donor_kiosk">
        <ConnectedModalWindow />
        <ConnectedSlideGrid />
      </div>
    );
  }
}

Kiosk.propTypes = {
  slides: PropTypes.array.isRequired,
  restart_kiosk: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  google_analytics: PropTypes.object.isRequired,
  setModalVisibility: PropTypes.func.isRequired,
  fetchRestartKiosk: PropTypes.func.isRequired,
  setModalRootComponent: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
};

export default Kiosk;
