import React, {Component, PropTypes} from 'react';
import TouchHours from '../../TouchHours';
import ConnectedTabbedPanel from '../../TabbedPanel';
import ConnectedClassroomSchedule from '../../TouchClassroomSchedule';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { taps: 0 };
  }

  _didTap() {
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
    this.props.fetchSlides(this.props.url);
    this.props.scrollToSlide(0);
  }

  /**
   * Hours button was clicked, set the modal to display the connected Hours component
   */
  hoursClicked() {
    this.props.setModalVisibility(true);
    this.props.setModalRootComponent(<TouchHours />);
  }

  /**
   * Maps button was clicked, set the modal to display the connected tab panel component
   */
  mapsClicked() {
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
    this.props.setModalVisibility(true);
    this.props.setModalRootComponent(<ConnectedClassroomSchedule />);
  }

  /**
   * Generate a Maps button if there are maps to display
   * @returns {JSX} - the LI element containing the maps button
   * @private
   */
  _mapsButton() {
    if (this.props.maps) {
      return (
        <li className="show-maps" onClick={this.mapsClicked.bind(this)}>
          <a className="btn btn-navbar btn-default">Maps</a>
        </li>);
    }
  }

  render() {
    let tapped_enough = this.state.taps > 20;
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
                <img className={`logo ${tapped_enough ? "is_active" : ""}`} src="/images/beaverlogo.png" onClick={this._didTap.bind(this)} />
              </div>
              <div id="navbar" className="navbar-collapse collapse">
                <ul className="nav navbar-nav">
                  <li className="show-hours" onClick={this.hoursClicked.bind(this)}>
                    <a className="btn btn-navbar btn-default">Hours</a>
                  </li>
                  {this._mapsButton()}
                  <li className="show-classroom-schedule" onClick={this.classroomScheduleClicked.bind(this)}>
                    <a className="btn btn-navbar btn-default">Classrooms Schedule</a>
                  </li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li className="refresh-slides" onClick={this.refreshClicked.bind(this)}>
                    <a>
                      <span
                        className={`glyphicon glyphicon-repeat ${this.props.is_fetching_slides ? "is_fetching" : ""}`}
                        aria-hidden="true">&nbsp;</span>
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

Header.propTypes = {
  url: PropTypes.string.isRequired,
  maps: PropTypes.array,
  is_fetching_slides: PropTypes.bool.isRequired,
  fetchSlides: PropTypes.func.isRequired,
  setModalVisibility: PropTypes.func.isRequired,
  setModalRootComponent: PropTypes.func.isRequired,
  scrollToSlide: PropTypes.func.isRequired,
};

export default Header;
