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
    let now = moment();
    this.props.fetchHours(this.props.api.hours, [now]);
    this.props.fetchSlides();
  }

  /**
   * When the app state updates, and the component updates, reset the hours and slides timeouts.
   */
  componentDidUpdate() {
    this._fetchHoursTimeout();
    this._fetchSlidesTimeout();
  }

  /**
   * Before the component unmounts, clear the timeouts.
   */
  componentWillUnmount() {
    clearTimeout(this.hours_timeout);
    clearTimeout(this.slides_timeout);
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
  maps: PropTypes.array,
  hours: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
  api: PropTypes.object.isRequired,
  is_fetching_slides: PropTypes.bool.isRequired,
  show_nav: PropTypes.bool.isRequired,
  fetchSlides: PropTypes.func.isRequired,
  setModalVisibility: PropTypes.func.isRequired,
  setModalRootComponent: PropTypes.func.isRequired,
  scrollToSlide: PropTypes.func.isRequired,
  fetchHours: PropTypes.func.isRequired,
};

export default Kiosk;
