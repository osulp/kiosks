import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import Header from './Header';
import Menu from './Menu';
import ConnectedSlideGallery from '../../SlideGallery';
import ConnectedTabbedPanel from '../../SidebarPanel';
import ConnectedMainContent from '../../MainContent';
import TouchHours from '../../TouchHours';
import ConnectedClassroomSchedule from '../../TouchClassroomSchedule';
import ConnectedMaps from '../../TouchMaps';
import ConnectedSearchPrimo from '../../TouchSearchPrimo';
import {trackClicked} from '../shared/GoogleAnalytics';
import moment from 'moment';

class Kiosk extends Component {
  constructor(props) {
      super(props);
      this.state = {
          taps: 0,
          menuCollapsed: true,
          selectedMenuItem: 'home'
      };

      this.mainMenuClicked = this.mainMenuClicked.bind(this);
      this.homeClicked = this.homeClicked.bind(this);
      this.hoursClicked = this.hoursClicked.bind(this);
      this.mapsClicked = this.mapsClicked.bind(this);
      this.staticMapsClicked = this.staticMapsClicked.bind(this);
      this.searchPrimoClicked = this.searchPrimoClicked.bind(this);
      this.classroomScheduleClicked = this.classroomScheduleClicked.bind(this);
      this._didTap = this._didTap.bind(this);
  }


  /**
   * Increase the state taps counter set a timer to reset it in 2 seconds unless another tap event happens. This
   * matters to the view in so much as it's able to determine if there have been continuous taps without 2 seconds of
   * delay in between. It's a feature..
   * @private
   */
  _didTap() {
    trackClicked(this.props.google_analytics, 'InteractiveKiosk:Header:Logo');
    this.setState({taps: this.state.taps + 1});
    this.setState({menuCollapsed: true});
    this.setState({ selectedMenuItem: 'home' });
    clearTimeout(this.reset_timeout);
    const reset = () => {
      this.setState({taps: 0});
    };
    this.reset_timeout = setTimeout(reset, 2000);
    this.props.setContentRootComponent(<ConnectedSlideGallery {...this.props} />)
  }

  /**
   * Main Menu button was clicked, set the content to display the connected main menu component
   */
  mainMenuClicked() {
    trackClicked(this.props.google_analytics, 'InteractiveKiosk:Header:MainMenu');
    this.setState({ menuCollapsed: !this.state.menuCollapsed });
  }

  /**
   * Show slides in the content area for interactive kiosk after 10 minutes (to be used when the user has selected
   * a different view from the navigation menu)
   * @private
   */
  _showSlidesTimeout() {
    this.show_slides_timeout = setInterval(() => {
      this.setState({ menuCollapsed: true });
      this.setState({ selectedMenuItem: 'home' });
      this.props.setContentRootComponent(<ConnectedSlideGallery {...this.props} />)
    }, 10 * 60 * 1000);
  }


  /**
   * Home button was clicked, set the content to go to the main menu
   */
  homeClicked() {
      trackClicked(this.props.google_analytics, 'InteractiveKiosk:Menu:Home');
      this.setState({ menuCollapsed: true });
      this.setState({ selectedMenuItem: 'home' });
      this.props.setContentRootComponent(<ConnectedSlideGallery {...this.props} />)
  }

  /**
   * Hours button was clicked, set the content to display the connected Hours component
   */
  hoursClicked() {
    trackClicked(this.props.google_analytics, 'InteractiveKiosk:Menu:Hours');
    this.setState({ menuCollapsed: true });
    this.setState({ selectedMenuItem: 'hours' });
    this.props.setContentRootComponent(<TouchHours />);
    clearInterval(this.show_slides_timeout);
    this._showSlidesTimeout();
  }

  /**
   * The maps button was clicked, set the content to display the maps component
   */
  mapsClicked() {
    trackClicked(this.props.google_analytics, 'InteractiveKiosk:Menu:Maps');
    this.setState({ menuCollapsed: true });
    this.setState({ selectedMenuItem: 'maps' });
    this.props.setContentRootComponent(<ConnectedMaps />);
    clearInterval(this.show_slides_timeout);
    this._showSlidesTimeout();
  }

  /**
   * Static Maps button was clicked (temporary component to use while libnav gets released)
   */
  staticMapsClicked() {
    trackClicked(this.props.google_analytics, 'TouchKiosk:Header:StaticMaps');
    this.setState({ menuCollapsed: true });
    this.setState({ selectedMenuItem: 'maps' });
    let tabs = this.props.maps.map((m) => {
      return {
        button_text: m.title,
        content: (<div style={{backgroundImage: `url("${m.image_url}")`}}>&nbsp;</div>)
      };
    });
    // this.props.setModalVisibility(true);
    this.props.setContentRootComponent(<ConnectedTabbedPanel id="maps_tabbed_panel"
                                                           tabs={tabs}
                                                           selectedIndex={1}
                                                           timeout={30000}/>);
    clearInterval(this.show_slides_timeout);
    this._showSlidesTimeout();
  }



  /**
   * The 1search button was clicked, set the content to display the connected search primo component
   */
  searchPrimoClicked() {
    trackClicked(this.props.google_analytics, 'InteractiveKiosk:Menu:SearchPrimo');
    this.setState({ menuCollapsed: true });
    this.setState({ selectedMenuItem: 'primo' });
    this.props.setContentRootComponent(<ConnectedSearchPrimo />);
    clearInterval(this.show_slides_timeout);
    this._showSlidesTimeout();
  }

  /**
   * The classroom schedule button was clicked, set the content to display the connected classroom schedule component
   */
  classroomScheduleClicked() {
    trackClicked(this.props.google_analytics, 'InteractiveKiosk:Menu:ClassroomSchedule');
    this.setState({ menuCollapsed: true });
    this.setState({ selectedMenuItem: 'schedule' });
    this.props.setContentRootComponent(<ConnectedClassroomSchedule />);
    clearInterval(this.show_slides_timeout);
    this._showSlidesTimeout();
  }

  /**
  * After the component mounts, fetch the current library hours and slides.
  */
  componentDidMount() {
    let now = moment().format('YYYY-MM-DD');
    this._fetchTodaysHoursTimeout();
    this._fetchSlidesTimeout();
    this._fetchRestartKioskTimeout();
    this.props.fetchTodaysHours(this.props.api.hours);
    this.props.fetchSlides(this.props.url);
  }

  /**
   * Before the component mounts, set the slide show to be the main root component.
   */
  componentWillMount() {
      this.props.setContentRootComponent(<ConnectedSlideGallery {...this.props} />)
  }

  /**
   * Before the component unmounts, clear the timeouts.
   */
  componentWillUnmount() {
    clearInterval(this.todays_hours_timeout);
    clearInterval(this.slides_timeout);
    clearInterval(this.restart_kiosk_timeout);
  }

  /**
   * Fetch the hours for "now" every 10 minutes, to keep kiosk with updated hours and the date as it changes.
   * @private
   */
  _fetchTodaysHoursTimeout() {
    this.todays_hours_timeout = setInterval(() => {
      let now = moment().format('YYYY-MM-DD');
      this.props.fetchTodaysHours(this.props.api.hours);
    }, 10 * 60 * 1000);
  }

  /**
   * Fetch the most recent slides every 10 minutes to keep the kiosk with updated slides as they are changed on the server.
   * @private
   */
  _fetchSlidesTimeout() {
    this.slides_timeout = setInterval(() => {
      this.props.fetchSlides(this.props.url);
    }, 10 * 60 * 1000);
  }

  /**
   * Fetch the restart_kiosk value for interactive kiosk every 1 minute in order to restart the kiosk as scheduled
   * @private
   */
  _fetchRestartKioskTimeout() {
    this.restart_kiosk_timeout = setInterval(() => {
      this.props.fetchRestartKiosk(this.props.url);
    }, 1 * 60 * 1000);
  }

  /**
   * Render the kiosk with a hidden content window for popup UIs driven by buttons in the header, with a rotating
   * slide gallery at the bottom of the view.
   * @returns {JSX}
   */
  render() {
    let kiosk_container_class = "";

    if(this.state.menuCollapsed) {
      kiosk_container_class = "container-kiosk-full";
    } else {
      kiosk_container_class = "container-kiosk";
    }

    return (
      <div id="interactive_kiosk">
          <div className={`${kiosk_container_class}`}>
              <Header
                  mainMenuClicked={this.mainMenuClicked}
                  _didTap={this._didTap}
                  taps={this.state.taps}
                  {...this.props} />

              <div className="row container-content">
                  <div className={`${(this.state.menuCollapsed ? "col-md-12" : "col-md-11")}`}>
                      <ConnectedMainContent />
                  </div>
                  <div className={`${(this.state.menuCollapsed ? "icons-only" : "menu-text")} `}>
                      <Menu
                          hoursClicked={this.hoursClicked}
                          homeClicked={this.homeClicked}
                          mapsClicked={this.mapsClicked}
                          staticMapsClicked={this.staticMapsClicked}
                          searchPrimoClicked={this.searchPrimoClicked}
                          classroomScheduleClicked={this.classroomScheduleClicked}
                          selectedMenuItem={this.state.selectedMenuItem}
                          {...this.props} />
                  </div>
              </div>
          </div>
      </div>
    );
  }
}

Kiosk.propTypes = {
  slides: PropTypes.array.isRequired,
  restart_kiosk: PropTypes.string.isRequired,
  maps: PropTypes.array,
  maps_base_url: PropTypes.string,
  hours: PropTypes.object.isRequired,
  todays_hours: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
  google_analytics: PropTypes.func,
  api: PropTypes.object.isRequired,
  is_fetching_slides: PropTypes.bool.isRequired,
  show_nav: PropTypes.bool.isRequired,
  fetchSlides: PropTypes.func.isRequired,
  fetchRestartKiosk: PropTypes.func.isRequired,
  setContentRootComponent: PropTypes.func.isRequired,
  scrollToSlide: PropTypes.func.isRequired,
  fetchTodaysHours: PropTypes.func.isRequired
};

export default Kiosk;
