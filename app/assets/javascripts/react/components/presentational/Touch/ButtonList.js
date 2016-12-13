import {connect} from 'react-redux';
import React, {Component, PropTypes} from 'react';

export class ButtonList extends Component {
  refreshClicked() {
    this.props.fetchSlides(this.props.url);
  }
  render() {
    return (
      <li>
        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
           aria-expanded="false">Dropdown <span className="caret"></span></a>
        <ul className="dropdown-menu">
          <li className="refresh-slides" onClick={this.refreshClicked.bind(this)}><a>Refresh Slides</a></li>
          <li className="divider" role="separator"><a>Action</a></li>
          <li><a>Separated Link</a></li>
          <li><a>Another Link</a></li>
        </ul>
      </li>
    );
  }
}

ButtonList.propTypes = {
  url: PropTypes.string.isRequired,
  fetchSlides: PropTypes.func,
};

export default ButtonList;

