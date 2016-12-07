import {connect} from 'react-redux';
import React, {Component, PropTypes} from 'react';

export class ButtonListItem extends Component {
  onClick() {
    this.props.dispatch(this.props.onButtonClick);
  }

  render() {
    return (
      <li role={this.props.role} className={this.props.className} onClick={this.onClick.bind(this)}><a>{this.props.text}</a></li>
    );
  }
}

ButtonListItem.propTypes = {
  onButtonClick: PropTypes.func,
};

export default connect()(ButtonListItem);
