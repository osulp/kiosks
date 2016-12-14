import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore';

import App from './App';
import TouchKiosk from './TouchKiosk';
import DonorKiosk from './DonorKiosk';
import {setKiosk, setSlides} from '../actions/kioskActions';

const store = configureStore();

export default class Root extends Component {

  /**
   * Prior to mounting, dispatch the Redux action to set the slides for the app
   */
  componentWillMount() {
    store.dispatch(setKiosk(this.props.kiosk_type, this.props.kiosk_url));
    store.dispatch(setSlides(this.props.slides));
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
      case 'donor':
        return (<DonorKiosk />);
      default:
        return (<App />);
    }
  }
}
