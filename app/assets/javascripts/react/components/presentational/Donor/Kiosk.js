import {connect} from 'react-redux';
import React, {Component, PropTypes} from 'react';
import SlideGrid from './SlideGrid';
import ConnectedModalWindow from '../../ModalWindow';

class Kiosk extends Component {
  render() {
    return (
      <div id="donor_kiosk">
        <ConnectedModalWindow />
        <SlideGrid {...this.props} />
      </div>
    );
  }
}

Kiosk.propTypes = {
  slides: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  setModalVisibility: PropTypes.func.isRequired,
  setModalRootComponent: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
};

export default Kiosk;
