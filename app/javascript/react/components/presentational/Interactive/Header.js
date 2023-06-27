import React, { Component } from "react"
import PropTypes from "prop-types"
import { trackClicked } from "../shared/GoogleAnalytics"

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = { taps: 0 }
  }

  /**
   * Format text based on the hours that were fetched for "today", defaulting to an empty string if there was an error or
   * no hours were fetched due to issues on the servers dependency to the data source.
   * @returns {String} - the hours detail
   * @private
   */
  _hoursToday() {
		if ( this.props.todays_hours == null || Object.values(this.props.todays_hours) == undefined || Object.values(this.props.todays_hours).length == 0 ) {
      return ""
    } else {
      let today = Object.values(this.props.todays_hours)[0]
      let formatted_hours = today.formatted_hours_plain_text

      return `${formatted_hours}`
    }
  }

  render() {
    let tapped_enough = this.props.taps > 20
    let is_fetching = this.props.is_fetching_slides ? "is_fetching" : ""
    return (
      <div className="row">
        <div className="navbar-wrapper">
          <nav className="navbar navbar-inverse navbar-static-top">
            <div className="nav navbar-nav navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#navbar"
                aria-expanded="false"
                aria-controls="navbar"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <img
                className={`logo ${tapped_enough ? "is_active" : ""}`}
                src="/images/osulogo.svg"
                onClick={this.props._didTap}
              />
            </div>
            <p className="hours navbar-text">
							Today: {this._hoursToday()}
            </p>
            <div className="nav navbar-nav navbar-right main-menu-header">
              <button
                className="btn btn-default main-menu hidden"
                onClick={this.props.mainMenuClicked}
              >
                <span className={`glyphicon glyphicon-menu-hamburger`} />
              </button>
            </div>
          </nav>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  url: PropTypes.string.isRequired,
  maps: PropTypes.array,
  hours: PropTypes.object.isRequired,
  todays_hours: PropTypes.object.isRequired,
  google_analytics: PropTypes.func,
  is_fetching_slides: PropTypes.bool.isRequired,
  fetchSlides: PropTypes.func.isRequired,
  setModalVisibility: PropTypes.func.isRequired,
  setModalRootComponent: PropTypes.func.isRequired,
  setContentRootComponent: PropTypes.func.isRequired,
  scrollToSlide: PropTypes.func.isRequired
}

export default Header
