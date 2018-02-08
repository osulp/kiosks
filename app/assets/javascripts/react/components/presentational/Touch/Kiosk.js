import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import Header from './Header';
import ConnectedSlideGallery from '../../SlideGallery';
import ConnectedModalWindow from '../../ModalWindow';
import moment from 'moment';

class Kiosk extends Component {
  /**
   * After the component mounts, fetch the current library hours and slides.
   */
  componentDidMount() {
    let now = moment().format('YYYY-MM-DD');
    this._fetchHoursTimeout();
    this._fetchSlidesTimeout();
    this._fetchRestartKioskTimeout();
    this.props.fetchHours(this.props.api.hours, [now]);
    this.props.fetchSlides(this.props.url);
  }

  /**
   * Before the component unmounts, clear the timeouts.
   */
  componentWillUnmount() {
    clearInterval(this.hours_timeout);
    clearInterval(this.slides_timeout);
    clearInterval(this.restart_kiosk_timeout);
  }

  /**
   * Fetch the hours for "now" every 10 minutes, to keep kiosk with updated hours and the date as it changes.
   * @private
   */
  _fetchHoursTimeout() {
    this.hours_timeout = setInterval(() => {
      let now = moment().format('YYYY-MM-DD');
      this.props.fetchHours(this.props.api.hours, [now]);
    }, 10 * 60 * 1000);
  }

  /**
   * Fetch the most recent slides every 10 minutes to keep the kiosk with updated slides as they are changed on the server.
   * @private
   */
  _fetchSlidesTimeout() {
    this.slides_timeout = setInterval(() => {
      this.props.fetchSlides(this.props.url);
    }, 10 * 60 * 1000);
  }

  /**
   * Fetch the restart_kiosk value for touch kiosk every 1 minute in order to restart the kiosk as scheduled
   * @private
   */
  _fetchRestartKioskTimeout() {
    this.restart_kiosk_timeout = setInterval(() => {
      this.props.fetchRestartKiosk(this.props.url);
    }, 1 * 60 * 1000);
  }

  /**
   * Render the kiosk with a hidden modal window for popup UIs driven by buttons in the header, with a rotating
   * slide gallery at the bottom of the view.
   * @returns {JSX}
   */
  render() {
    return (
      <div id="touch_kiosk">
        <ConnectedModalWindow />
        <Header {...this.props} />
        <ConnectedSlideGallery {...this.props} />
      </div>
    );
  }
}

Kiosk.propTypes = {
  slides: PropTypes.array.isRequired,
  restart_kiosk: PropTypes.string.isRequired,
  maps: PropTypes.array,
  hours: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
  google_analytics: PropTypes.object,
  api: PropTypes.object.isRequired,
  is_fetching_slides: PropTypes.bool.isRequired,
  show_nav: PropTypes.bool.isRequired,
  fetchSlides: PropTypes.func.isRequired,
  fetchRestartKiosk: PropTypes.func.isRequired,
  setModalVisibility: PropTypes.func.isRequired,
  setModalRootComponent: PropTypes.func.isRequired,
  scrollToSlide: PropTypes.func.isRequired,
  fetchHours: PropTypes.func.isRequired,
};

export default Kiosk;
