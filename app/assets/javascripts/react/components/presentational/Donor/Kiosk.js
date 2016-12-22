import {connect} from 'react-redux';
import React, {Component, PropTypes} from 'react';
import ConnectedModalWindow from '../../ModalWindow';
import ConnectedSlideGrid from '../../DonorSlideGrid';

class Kiosk extends Component {
  render() {
    return (
      <div id="donor_kiosk">
        <ConnectedModalWindow />
        <ConnectedSlideGrid />
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
