import React, {Component, PropTypes} from 'react';
import moment from 'moment';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
        taps: 0,
        selected_item: 'home'
    };
  }

  render() {
    let tapped_enough = (this.state.taps > 20);
    let is_fetching = this.props.is_fetching_slides ? "is_fetching" : "";
    return (
        <ul className="nav navbar-nav">
            <li className="show-home" onClick={this.props.homeClicked}>
                <a className={`btn btn-navbar btn-default ${(this.props.selectedMenuItem == "home" ? "menu-item-selected" : "")}`}>
                    <img className={"menu-item-icon"} src={"/images/home.svg"} />
                    <span className={"menu-item-text"}>Home</span>
                </a>
            </li>
            <li className="show-hours" onClick={this.props.hoursClicked}>
                <a className={`btn btn-navbar btn-default ${(this.props.selectedMenuItem == "hours" ? "menu-item-selected" : "")}`}>
                    <img className={"menu-item-icon"} src={"/images/clock.svg"} />
                    <span className={"menu-item-text"}>Hours</span>
                </a>
            </li>
            <li className="show-maps" onClick={this.props.staticMapsClicked}>
                <a className={`btn btn-navbar btn-default ${(this.props.selectedMenuItem == "maps" ? "menu-item-selected" : "")}`}>
                    <img className={"menu-item-icon"} src={"/images/map-marker.svg"} />
                    <span className={"menu-item-text"}>Maps</span>
                </a>
            </li>
            <li className="show-search-primo" onClick={this.props.searchPrimoClicked}>
                <a className={`btn btn-navbar btn-default ${(this.props.selectedMenuItem == "primo" ? "menu-item-selected" : "")}`}>
                    <img className={"menu-item-icon"} src={"/images/search.svg"} />
                    <span className={"menu-item-text"}>Search</span>
                </a>
            </li>
            <li className="show-classroom-schedule" onClick={this.props.classroomScheduleClicked}>
                <a className={`btn btn-navbar btn-default ${(this.props.selectedMenuItem == "schedule" ? "menu-item-selected" : "")}`}>
                    <img className={"menu-item-icon"} src={"/images/calendar-alt.svg"} />
                    <span className={"menu-item-text"}>Classrooms</span>
                </a>
            </li>
        </ul>
    );
  }
}

Menu.propTypes = {
  url: PropTypes.string.isRequired,
  maps: PropTypes.array,
  hours: PropTypes.object.isRequired,
  google_analytics: PropTypes.func,
  is_fetching_slides: PropTypes.bool.isRequired,
  fetchSlides: PropTypes.func.isRequired,
  setContentRootComponent: PropTypes.func.isRequired,
  scrollToSlide: PropTypes.func.isRequired
};

export default Menu;
