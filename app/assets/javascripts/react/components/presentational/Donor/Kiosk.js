import {connect} from 'react-redux';
import React, {Component, PropTypes} from 'react';
import SlideGrid from './SlideGrid';

class Kiosk extends Component {
  render() {
    return (
      <div id="donor_kiosk">
        <SlideGrid {...this.props} />
      </div>
    );
  }
}

Kiosk.propTypes = {
  slides: PropTypes.array.isRequired,
};

export default Kiosk;
