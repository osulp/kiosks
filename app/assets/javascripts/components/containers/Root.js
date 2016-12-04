import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore';

import App from './App';
import {setSlides} from '../actions/SlideActions';

const store = configureStore();

export default class Root extends Component {

  componentWillMount() {

    // TODO: Redux dispatch an action to set the app in motion
    store.dispatch(setSlides(this.props.slides));

    if (typeof App !== 'undefined') {

      // TODO: If using ActionCable, subscribe to a channel for data
      //App.room = App.cable.subscriptions.create("RoomChannel", {
      //  connected: function() {},
      //  disconnected: function() {},
      //  received: function(data) {
      //    return store.dispatch(addMessage(data['message']));
      //  },
      //  speak: function(message) {
      //    return this.perform('speak', {
      //      message: message
      //    });
      //  }
      //});
    }
  }

  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    );
  }
}