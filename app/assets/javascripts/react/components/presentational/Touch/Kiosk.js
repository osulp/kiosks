import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import Header from './Header';
import ConnectedSlideGallery from '../../SlideGallery';

class Kiosk extends Component {
  render() {
    return (
      <div id="touch_kiosk">
        <Header />
        <ConnectedSlideGallery {...this.props} />
      </div>
    );
  }
}

Kiosk.propTypes = {
  slides: PropTypes.array.isRequired,
};

export default Kiosk;
