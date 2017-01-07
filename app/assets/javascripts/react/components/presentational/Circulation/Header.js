import React, {Component, PropTypes} from 'react';

class Header extends Component {
  refreshClicked() {
    this.props.fetchSlides(this.props.url);
    this.props.scrollToSlide(0);
  }
  render() {
    return (
      <div className="navbar-wrapper">
        <nav className="navbar navbar-inverse navbar-static-top">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                    aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <img className="logo" src="/images/beaverlogo.png"/>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <div className="circ-title">Announcements</div>
          </div>
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
  url: PropTypes.string.isRequired,
  is_fetching_slides: PropTypes.bool.isRequired,
  fetchSlides: PropTypes.func.isRequired,
  scrollToSlide: PropTypes.func.isRequired
};

export default Header;
