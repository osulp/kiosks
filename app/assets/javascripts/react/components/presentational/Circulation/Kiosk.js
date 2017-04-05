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
    // var test = new Date("2016/11/03 12:00:00");
    // let now = moment(test);
    let now = moment().format();
    this.props.fetchHours(this.props.api.hours, [now]);
  }

  /**
   * When the app state updates, and the component updates, reset the hours and slides timeouts.
   */
  componentDidUpdate() {
    this._fetchHoursTimeout();
  }

  /**
   * Before the component unmounts, clear the timeouts.
   */
  componentWillUnmount() {
    clearTimeout(this.hours_timeout);
  }

  /**
   * Fetch the hours for "now" every 10 minutes, to keep kiosk with updated hours and the date as it changes.
   * @private
   */
  _fetchHoursTimeout() {
    const fetch_hours = () => {
      let now = moment();
      this.props.fetchHours(this.props.api.hours, [now]);
    };
    clearTimeout(this.hours_timeout);
    this.hours_timeout = setTimeout(fetch_hours, 10*60*1000);
  }

  /**
   * Fetch the most recent slides every 60 minutes to keep the kiosk with updated slides as they are changed on the server.
   * @private
   */
  _fetchSlidesTimeout() {
    const fetch_slides = () => {
      this.props.fetchSlides();
    };
    clearTimeout(this.slides_timeout);
    this.slides_timeout = setTimeout(fetch_slides, 60*60*1000);
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
  url: PropTypes.string.isRequired,
  is_fetching_slides: PropTypes.bool.isRequired,
  show_nav: PropTypes.bool.isRequired,
  fetchSlides: PropTypes.func.isRequired,
  scrollToSlide: PropTypes.func.isRequired,
  api: PropTypes.object.isRequired,
  hours: PropTypes.object.isRequired,
  fetchHours: PropTypes.func.isRequired,
};

export default Kiosk;
