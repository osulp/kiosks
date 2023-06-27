import React, { Component } from "react"
import PropTypes from "prop-types"
import moment from "moment"

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      taps: 0,
      selected_item: "home"
    }
  }

  render() {
    let tapped_enough = this.state.taps > 20
    let is_fetching = this.props.is_fetching_slides ? "is_fetching" : ""
    let maps_click_handler =
      this.props.maps_base_url.trim().length == 0
        ? this.props.staticMapsClicked
        : this.props.mapsClicked
    return (
      <ul className="nav navbar-nav">
        <li className="show-home" onClick={this.props.homeClicked}>
          <a
            className={`btn btn-navbar btn-default ${
              this.props.selectedMenuItem == "home" ? "menu-item-selected" : ""
            }`}
          >
            <img className={"menu-item-icon"} src={"/images/home.svg"} />
            <span className={"menu-item-text"}>Home</span>
          </a>
        </li>
        <li className="show-maps" onClick={maps_click_handler}>
          <a
            className={`btn btn-navbar btn-default ${
              this.props.selectedMenuItem == "maps" ? "menu-item-selected" : ""
            }`}
          >
            <img className={"menu-item-icon"} src={"/images/map-marker.svg"} />
            <span className={"menu-item-text"}>Maps</span>
          </a>
        </li>
				<li className="show-campus-maps" onClick={this.props.campusMapsClicked}>
          <a
            className={`btn btn-navbar btn-default ${
              this.props.selectedMenuItem == "campus-maps" ? "menu-item-selected" : ""
            }`}
          >
            <img className={"menu-item-icon"} src={"/images/map-marker.svg"} />
            <span className={"menu-item-text"}>Campus</span>
          </a>
        </li>
        <li
          className="show-search-primo"
          onClick={this.props.searchPrimoClicked}
        >
          <a
            className={`btn btn-navbar btn-default ${
              this.props.selectedMenuItem == "primo" ? "menu-item-selected" : ""
            }`}
          >
            <img className={"menu-item-icon"} src={"/images/search.svg"} />
            <span className={"menu-item-text"}>Catalog </span>
          </a>
        </li>
      </ul>
    )
  }
}

Menu.propTypes = {
  url: PropTypes.string.isRequired,
  maps: PropTypes.array,
  maps_base_url: PropTypes.string,
  hours: PropTypes.object.isRequired,
  google_analytics: PropTypes.func,
  is_fetching_slides: PropTypes.bool.isRequired,
  fetchSlides: PropTypes.func.isRequired,
  setContentRootComponent: PropTypes.func.isRequired,
  scrollToSlide: PropTypes.func.isRequired
}

export default Menu
