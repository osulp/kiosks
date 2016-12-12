import React, {Component, PropTypes} from 'react';
import ButtonListItem from './ButtonListItem';

class ButtonList extends Component {
  render() {
    return (
      <li>
        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
           aria-expanded="false">Dropdown <span className="caret"></span></a>
        <ul className="dropdown-menu">
          <ButtonListItem text="Refresh Slides" onButtonClick={this.props.fetchSlides(this.props.url)} />
          <ButtonListItem text="Action" className="divider" role="separator" />
          <ButtonListItem text="" className="dropdown-header" />
          <ButtonListItem text="Separated link" />
          <ButtonListItem text="One more separate link" />
        </ul>
      </li>
    );
  }
}

ButtonList.propTypes = {
  url: PropTypes.string.isRequired,
  fetchSlides: PropTypes.func.isRequired,
};

export default ButtonList;
