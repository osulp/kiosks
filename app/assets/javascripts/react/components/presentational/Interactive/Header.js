import React, {Component, PropTypes} from 'react';
import TouchHours from '../../TouchHours';
import ConnectedTabbedPanel from '../../TabbedPanel';
import ConnectedClassroomSchedule from '../../TouchClassroomSchedule';
import ConnectedMaps from '../../TouchMaps';
import ConnectedSearchPrimo from '../../TouchSearchPrimo';
import ConnectedSlideGallery from '../../SlideGallery';
import {trackClicked} from '../shared/GoogleAnalytics';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { taps: 0 };
  }

  /**
   * Refresh button was clicked, fire off actions to fetch the latest slides and reset
   * the gallery scroll position
   */
  refreshClicked() {
    trackClicked(this.props.google_analytics, 'InteractiveKiosk:Header:Refresh');
    this.props.fetchSlides(this.props.url);
    this.props.scrollToSlide(0);
  }

  /**
   * Hours button was clicked, set the modal to display the connected Hours component
   */
  hoursClicked() {
    trackClicked(this.props.google_analytics, 'InteractiveKiosk:Header:Hours');
    this.props.setModalVisibility(true);
    this.props.setModalRootComponent(<TouchHours />);
  }

  /**
   * Maps button was clicked, set the modal to display the connected tab panel component
   */
  mapsClicked() {
    trackClicked(this.props.google_analytics, 'InteractiveKiosk:Header:Maps');
    let tabs = this.props.maps.map((m) => {
      return {
        button_text: m.title,
        content: (<div style={{backgroundImage: `url("${m.image_url}")`}}>&nbsp;</div>)
      };
    });
    this.props.setModalVisibility(true);
    this.props.setModalRootComponent(<ConnectedTabbedPanel id="maps_tabbed_panel"
                                                           tabs={tabs}
                                                           selectedIndex={1}
                                                           timeout={30000}/>);
  }

  /**
   * The classroom schedule button was clicked, set the modal to display the connected classroom schedule component
   */
  classroomScheduleClicked() {
    trackClicked(this.props.google_analytics, 'InteractiveKiosk:Header:ClassroomSchedule');
    this.props.setModalVisibility(true);
    this.props.setModalRootComponent(<ConnectedClassroomSchedule />);
  }

  /**
   * The 1search button was clicked, set the modal to display the connected search primo component
   */
  searchPrimoClicked() {
    trackClicked(this.props.google_analytics, 'InteractiveKiosk:Header:SearchPrimo');
    this.props.setModalVisibility(true);
    this.props.setModalRootComponent(<ConnectedSearchPrimo />);
  }
  /**
   * The maps button was clicked, set the modal to display the maps component
   */
  mapsClicked() {
    trackClicked(this.props.google_analytics, 'InteractiveKiosk:Header:Maps');
    this.props.setModalVisibility(true);
    this.props.setModalRootComponent(<ConnectedMaps />);
  }

  /**
   * Format text based on the hours that were fetched for "today", defaulting to an empty string if there was an error or
   * no hours were fetched due to issues on the servers dependency to the data source.
   * @returns {String} - the hours detail
   * @private
   */
  _hoursToday(){
    if(this.props.todays_hours.error || Object.values(this.props.todays_hours).length == 0) {
      return "";
    } else {
      let today = Object.values(this.props.todays_hours)[0];
      return `${today.formatted_hours.trim()} on ${today.string_date}`;
    }
  }

  render() {
    let tapped_enough = (this.props.taps > 20);
    let is_fetching = this.props.is_fetching_slides ? "is_fetching" : "";
    return (
        <div className="row">
            <div className="navbar-wrapper">
                <nav className="navbar navbar-inverse navbar-static-top">
                    <div className="nav navbar-nav navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                                aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <img className={`logo ${tapped_enough ? 'is_active' : ''}`} src="/images/osulogo.svg" onClick={this.props._didTap} />
                    </div>
                    <p className="hours navbar-text">{this._hoursToday()}</p>
                    <div className="nav navbar-nav navbar-right main-menu-header">
                        <button className="btn btn-default main-menu hidden" onClick={this.props.mainMenuClicked}>
                            <span className={`glyphicon glyphicon-menu-hamburger`}></span>
                        </button>
                    </div>
                </nav>
            </div>
        </div>
    );
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
};

export default Header;
