import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore';

import App from './App';
import TouchKiosk from './TouchKiosk';
import DonorKiosk from './DonorKiosk';
import CirculationKiosk from './CirculationKiosk';
import MediaKiosk from './MediaKiosk';
import InteractiveKiosk from './InteractiveKiosk';
import {setKiosk, setSlides, setRestartKiosk, setGoogleAnalytics} from '../actions/kioskActions';
import {setMaps} from '../actions/touchActions';

const store = configureStore();

export default class Root extends Component {

  /**
   * Prior to mounting, dispatch the Redux action to set the slides for the app
   */
  componentWillMount() {
    store.dispatch(setKiosk(this.props.kiosk_type, this.props.kiosk_url, this.props.kiosk_map_default_floor_number, this.props.kiosk_maps_base_url, this.props.kiosk_name, this.props.kiosk_id));
    store.dispatch(setSlides(this.props.slides));
    store.dispatch(setRestartKiosk(this.props.restart_kiosk));
    store.dispatch(setMaps(this.props.maps));
    if(typeof this.props.google_analytics != 'undefined') {
      store.dispatch(setGoogleAnalytics(this.props.google_analytics));
    }
  }

  /**
   * Render the provider to tie the store to the container React component
   * @returns {Component}
   */
  render() {
    return (
      <Provider store={store}>
        {this.getComponent(this.props.kiosk_type)}
      </Provider>
    );
  }

  /**
   * Given the type of kiosk to be rendered, return the proper application container
   * @param {string} kiosk_type - The type of container React component to render
   * @returns {Component}
   **/
  getComponent(kiosk_type) {
    switch(kiosk_type) {
      case 'touch':
        return (<TouchKiosk />);
      case 'donorcoverflow':
      case 'donor':
        return (<DonorKiosk />);
      case 'circulation':
        return (<CirculationKiosk />);
      case 'media':
        return (<MediaKiosk />);
      case 'interactive':
        return (<InteractiveKiosk />);
      default:
        return (<App />);
    }
  }
}
