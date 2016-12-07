import React, {Component, PropTypes} from 'react';
import ButtonList from './ButtonList';
import ButtonListItem  from './ButtonListItem';

class Header extends Component {
  render() {
    return (
      <div className="navbar-wrapper">
        <div className="container">
          <nav className="navbar navbar-inverse navbar-static-top">
            <div className="container">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <img src="/images/beaverlogo.png"/>
              </div>
              <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                  <ButtonListItem className="active" text="Home" />
                  <ButtonListItem text="About" />
                  <ButtonListItem text="Contact" />
                  <ButtonList className="dropdown" fetchSlides={this.props.fetchSlides} />
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  fetchSlides: PropTypes.func.isRequired,
};

export default Header;
