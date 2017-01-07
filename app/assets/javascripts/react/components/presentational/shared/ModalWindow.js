import {connect} from 'react-redux';
import React, {Component, PropTypes} from 'react';

class ModalWindow extends Component {
  closeModal(event) {
    // prevents clicks from within the root_component from triggering the close. User can click on the close
    // icon or anywhere outside of the root_component to close the modal.
    if(event.target.id == "modal" || event.target.id == "modal_close") {
      this.props.setModalRootComponent();
      this.props.setModalVisibility(false);
    }
  }

  render() {
    let display = this.props.visible ? "block" : "none";
    let root_component = this.props.root_component;
    let close_icon_component = React.createElement(
      "SPAN",
      {
        className: "glyphicon glyphicon-remove-circle",
        onClick: this.closeModal.bind(this),
        id: "modal_close"
      },
      "");
    return (
      <div id="modal" style={{display: display}} onClick={this.closeModal.bind(this)}>
        {root_component ? close_icon_component : undefined }
        {root_component}
      </div>
    );
  }
}

ModalWindow.propTypes = {
  visible: PropTypes.bool.isRequired,
  root_component: PropTypes.element,
  setModalVisibility: PropTypes.func.isRequired,
  setModalRootComponent: PropTypes.func.isRequired,
};

export default ModalWindow;
