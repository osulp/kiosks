import React, {Component, PropTypes} from 'react';
import TouchHours from '../../TouchHours';

class Header extends Component {
  refreshClicked() {
    this.props.fetchSlides(this.props.url);
    this.props.scrollToSlide(0);
  }
  hoursClicked(){
    this.props.setModalVisibility(true);
    this.props.setModalRootComponent(<TouchHours />);
  }
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
                <img className="logo" src="/images/beaverlogo.png"/>
              </div>
              <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                  <li className="show-hours" onClick={this.hoursClicked.bind(this)}><a className="btn btn-navbar btn-default">Hours</a></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li className="refresh-slides" onClick={this.refreshClicked.bind(this)}>
                    <a>
                      <span className={`glyphicon glyphicon-repeat ${this.props.is_fetching_slides ? "is_fetching" : ""}`} aria-hidden="true">&nbsp;</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

Header.PropTypes = {
  url: PropTypes.string.isRequired,
  is_fetching_slides: PropTypes.bool.isRequired,
  fetchSlides: PropTypes.func.isRequired,
  setModalVisibility: PropTypes.func.isRequired,
  setModalRootComponent: PropTypes.func.isRequired,
  scrollToSlide: PropTypes.func.isRequired,
};

export default Header;
