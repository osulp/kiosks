import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

class ModalWindow extends Component {
  render() {
    let display = this.props.visible ? "block" : "none";
    let root_component = this.props.root_component;
    if(!root_component && this.props.visible) {
      console.error(`ModalWindow called to display a null root_component, unable to render.`);
    }
    return (
      <div id="modal" style={{display: display}}>
        {this.props.root_component}
      </div>
    );
  }
}

ModalWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  root_component: PropTypes.element
};

export default ModalWindow;
