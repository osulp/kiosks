import React, {Component, PropTypes} from 'react';

class Header extends Component {
  refreshClicked() {
    this.props.fetchSlides(this.props.url);
    this.props.scrollToSlide(0);
  }

  /**
   * Format text based on the hours that were fetched for "today", defaulting to an empty string if there was an error or
   * no hours were fetched due to issues on the servers dependency to the data source.
   * @returns {String} - the hours detail
   * @private
   */
  _hoursToday(){
    if(this.props.hours.error || Object.values(this.props.hours).length == 0) {
      return "";
    } else {
      let today = Object.values(this.props.hours)[0];
      return `${today.formatted_hours.trim()} on ${today.string_date}`;
    }
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
            <img className="logo" src="/images/osulibrarylogo.png"/>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <div className="circ-title">Announcements</div>
            <div className="circ-hours navbar-text">{this._hoursToday()}</div>
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
  scrollToSlide: PropTypes.func.isRequired,
  hours: PropTypes.object.isRequired
};

export default Header;
