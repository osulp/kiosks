import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import Header from './Header';
import Rooms from './Rooms';
import ConnectedSlideGallery from '../../SlideGallery';

class Kiosk extends Component {
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
  api: PropTypes.object.isRequired
};

export default Kiosk;
