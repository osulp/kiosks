import React, {Component, PropTypes} from 'react';
import TouchHours from '../../TouchHours';
import ConnectedTabbedPanel from '../../TabbedPanel';
import ConnectedMaps from '../../TouchMaps';
import ConnectedSearchPrimo from '../../TouchSearchPrimo';
import {trackClicked} from '../shared/GoogleAnalytics';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { taps: 0 };
  }

  /**
   * Increase the state taps counter set a timer to reset it in 2 seconds unless another tap event happens. This
   * matters to the view in so much as it's able to determine if there have been continuous taps without 2 seconds of
   * delay in between. It's a feature..
   * @private
   */
  _didTap() {
    trackClicked(this.props.google_analytics, 'TouchKiosk:Header:Logo');
    this.setState({taps: this.state.taps + 1});
    clearTimeout(this.reset_timeout);
    const reset = () => {
      this.setState({taps: 0});
    };
    this.reset_timeout = setTimeout(reset, 2000);
  }

  /**
   * Refresh button was clicked, fire off actions to fetch the latest slides and reset
   * the gallery scroll position
   */
  refreshClicked() {
    trackClicked(this.props.google_analytics, 'TouchKiosk:Header:Refresh');
    this.props.fetchSlides(this.props.url);
    this.props.scrollToSlide(0);
  }

  /**
   * Hours button was clicked, set the modal to display the connected Hours component
   */
  hoursClicked() {
    trackClicked(this.props.google_analytics, 'TouchKiosk:Header:Hours');
    this.props.setModalVisibility(true);
    this.props.setModalRootComponent(<TouchHours />);
  }

  /**
   * Maps button was clicked, set the modal to display the connected tab panel component
   */
  mapsClicked() {
    trackClicked(this.props.google_analytics, 'TouchKiosk:Header:Maps');
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
   * The 1search button was clicked, set the modal to display the connected search primo component
   */
  searchPrimoClicked() {
    trackClicked(this.props.google_analytics, 'TouchKiosk:Header:SearchPrimo');
    this.props.setModalVisibility(true);
    this.props.setModalRootComponent(<ConnectedSearchPrimo />);
  }
  /**
   * The maps button was clicked, set the modal to display the maps component
   */
  mapsClicked() {
    trackClicked(this.props.google_analytics, 'TouchKiosk:Header:Maps');
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
    if(this.props.hours.error || Object.values(this.props.hours).length == 0) {
      return "";
    } else {
      let today = Object.values(this.props.hours)[0];
      return `${today.formatted_hours.trim()} on ${today.string_date}`;
    }
  }

  render() {
    let tapped_enough = (this.state.taps > 20);
    let is_fetching = this.props.is_fetching_slides ? "is_fetching" : "";
    return (
      <div className="navbar-wrapper">
        <div className="container">
          <nav className="navbar navbar-inverse navbar-static-top">
            <div className="container">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                        aria-expanded="false" aria-controls="navbar">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <img className={`logo ${tapped_enough ? 'is_active' : ''}`} src="/images/osulibrarylogo.png" onClick={this._didTap.bind(this)} />
              </div>
              <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                  <li className="show-hours" onClick={this.hoursClicked.bind(this)}>
                    <a className="btn btn-navbar btn-default">Hours</a>
                  </li>
                  <li className="show-maps" onClick={this.mapsClicked.bind(this)}>
                    <a className="btn btn-navbar btn-default">Maps</a>
                  </li>
                  <li className="show-search-primo" onClick={this.searchPrimoClicked.bind(this)}>
                    <a className="btn btn-navbar btn-default">1Search</a>
                  </li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li className="refresh-slides" onClick={this.refreshClicked.bind(this)}>
                    <a>
                      <span
                        className={`glyphicon glyphicon-repeat ${is_fetching}`}
                        aria-hidden="true">&nbsp;</span>
                    </a>
                  </li>
                </ul>
                <p className="hours navbar-text">{this._hoursToday()}</p>
              </div>
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
  google_analytics: PropTypes.func,
  is_fetching_slides: PropTypes.bool.isRequired,
  fetchSlides: PropTypes.func.isRequired,
  setModalVisibility: PropTypes.func.isRequired,
  setModalRootComponent: PropTypes.func.isRequired,
  scrollToSlide: PropTypes.func.isRequired
};

export default Header;
