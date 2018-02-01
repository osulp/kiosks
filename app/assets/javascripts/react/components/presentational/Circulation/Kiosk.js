import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import Header from './Header';
import Rooms from './Rooms';
import ConnectedSlideGallery from '../../SlideGallery';

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
   * Fetch the restart_kiosk value for circulation kiosk every 1 minute in order to restart the kiosk as scheduled
   * @private
   */
  _fetchRestartKioskTimeout() {
    this.restart_kiosk_timeout = setInterval(() => {
      this.props.fetchRestartKiosk(this.props.url);
    }, 1 * 60 * 1000);
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

  render() {
    return (
      <div id="circulation_kiosk">
        <div className="row">
          <div className="col-md-12">
            <Header {...this.props} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-2">
            <Rooms {...this.props} />
          </div>
          <div className="col-md-10">
            <ConnectedSlideGallery {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}

Kiosk.propTypes = {
  slides: PropTypes.array.isRequired,
  restart_kiosk: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  is_fetching_slides: PropTypes.bool.isRequired,
  show_nav: PropTypes.bool.isRequired,
  fetchSlides: PropTypes.func.isRequired,
  fetchRestartKiosk: PropTypes.func.isRequired,
  scrollToSlide: PropTypes.func.isRequired,
  api: PropTypes.object.isRequired,
  hours: PropTypes.object.isRequired,
  fetchHours: PropTypes.func.isRequired,
};

export default Kiosk;
