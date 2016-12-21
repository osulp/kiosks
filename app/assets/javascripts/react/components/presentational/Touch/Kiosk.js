import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import Header from './Header';
import ConnectedSlideGallery from '../../SlideGallery';
import ConnectedModalWindow from '../../ModalWindow';

class Kiosk extends Component {
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
  url: PropTypes.string.isRequired,
  is_fetching_slides: PropTypes.bool.isRequired,
  fetchSlides: PropTypes.func.isRequired,
  setModalVisibility: PropTypes.func.isRequired,
  setModalRootComponent: PropTypes.func.isRequired,
  scrollToSlide: PropTypes.func.isRequired,
};

export default Kiosk;
