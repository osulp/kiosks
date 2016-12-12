import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import ConnectedHeader from '../../TouchHeader';
import ConnectedSlideGallery from '../../SlideGallery';

class Kiosk extends Component {
  render() {
    return (
      <div id="touch_kiosk">
        <ConnectedHeader />
        <ConnectedSlideGallery className="carousel slide" {...this.props} />
      </div>
    );
  }
}

Kiosk.propTypes = {
  slides: PropTypes.array.isRequired,
};

export default Kiosk;
