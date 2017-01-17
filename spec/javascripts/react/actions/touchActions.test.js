import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {ADD_ERROR, SET_SLIDES} from '../../../../app/assets/javascripts/react/actions/kioskActions';
import {FETCHING_SLIDES, FETCHED_SLIDES, FETCHING_HOURS, FETCHED_HOURS, SET_HOURS} from '../../../../app/assets/javascripts/react/actions/touchActions';
import * as actionCreator from '../../../../app/assets/javascripts/react/actions/touchActions';
import * as factories from '../.factories';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const bogus_host = "http://my.server.com";
const bogus_action = "/blah";
const bogus_action_json = `${bogus_action}.json`;
const bogus_action_url = `${bogus_host}${bogus_action}`;
const bogus_api_hours = "/api/v1/hours";
const bogus_api_hours_url = `${bogus_host}${bogus_api_hours}`;

describe('Action::Touch', () => {
  describe('#fetchSlides()', () => {
    // reset the http mock state
    afterEach(() => {
      nock.cleanAll()
    });

    it('should work', () => {
      // Mock the HTTP call and return what is expected from the server
      nock(bogus_host)
        .get(bogus_action_json)
        .reply(200, {slides: factories.slides});

      // The actions that were set in the store during the async call.
      // If an async call dispatches multiple actions, they must be set here.
      const expectedActions = [
        {type: FETCHING_SLIDES},
        {type: SET_SLIDES, kiosk: {slides: factories.slides}}
      ];
      const store = mockStore({slides: []});

      const asyncAction = actionCreator.fetchSlides(bogus_action_url);
      return store.dispatch(asyncAction)
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should return an error', () => {
      // Mock the HTTP call and return what is expected from the server
      // TODO: Check and properly mock errors from the server
      nock(bogus_host)
        .get(bogus_action_json)
        .replyWithError(factories.error);

      const nock_error_message = `request to ${bogus_host}${bogus_action_json} failed, reason: ${factories.error.message}`;
      // The actions that were set in the store during the async call.
      // If an async call dispatches multiple actions, they must be set here.
      const expectedActions = [
        {type: FETCHING_SLIDES},
        {type: ADD_ERROR, error: {message: nock_error_message, code: factories.error.code}},
        {type: FETCHED_SLIDES}
      ];
      const store = mockStore({slides: []});

      const asyncAction = actionCreator.fetchSlides(bogus_action_url);
      return store.dispatch(asyncAction)
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
  describe('#fetchHours()', () => {
    // reset the http mock state
    afterEach(() => {
      nock.cleanAll()
    });

    it('should work', () => {
      // Mock the HTTP call and return what is expected from the server
      nock(bogus_host)
        .post(bogus_api_hours)
        .reply(200, factories.hours);

      // The actions that were set in the store during the async call.
      // If an async call dispatches multiple actions, they must be set here.
      const expectedActions = [
        {type: FETCHING_HOURS},
        {type: SET_HOURS, hours: factories.hours}
      ];
      const store = mockStore({hours: []});

      const asyncAction = actionCreator.fetchHours(bogus_api_hours_url);
      return store.dispatch(asyncAction)
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should return an error', () => {
      // Mock the HTTP call and return what is expected from the server
      // TODO: Check and properly mock errors from the server
      nock(bogus_host)
        .post(bogus_api_hours)
        .replyWithError(factories.error);

      const nock_error_message = `request to ${bogus_host}${bogus_api_hours} failed, reason: ${factories.error.message}`;
      // The actions that were set in the store during the async call.
      // If an async call dispatches multiple actions, they must be set here.
      const expectedActions = [
        {type: FETCHING_HOURS},
        {type: ADD_ERROR, error: {message: nock_error_message, code: factories.error.code}},
        {type: FETCHED_HOURS}
      ];
      const store = mockStore({hours: []});

      const asyncAction = actionCreator.fetchHours(bogus_api_hours_url);
      return store.dispatch(asyncAction)
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
    it('should return a 404 error', () => {
      // Mock the HTTP call and return what is expected from the server
      // TODO: Check and properly mock errors from the server
      nock(bogus_host)
        .post(bogus_api_hours)
        .reply(404);

      // The actions that were set in the store during the async call.
      // If an async call dispatches multiple actions, they must be set here.
      const expectedActions = [
        {type: FETCHING_HOURS},
        {type: SET_HOURS, hours: {error: "Hours not found for the selected date."}}
      ];
      const store = mockStore({hours: []});

      const asyncAction = actionCreator.fetchHours(bogus_api_hours_url);
      return store.dispatch(asyncAction)
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
    it('should return a 500 error', () => {
      // Mock the HTTP call and return what is expected from the server
      // TODO: Check and properly mock errors from the server
      nock(bogus_host)
        .post(bogus_api_hours)
        .reply(500);

      // The actions that were set in the store during the async call.
      // If an async call dispatches multiple actions, they must be set here.
      const expectedActions = [
        {type: FETCHING_HOURS},
        {type: SET_HOURS, hours: {error: "Error fetching hours, please notify the help desk."}}
      ];
      const store = mockStore({hours: []});

      const asyncAction = actionCreator.fetchHours(bogus_api_hours_url);
      return store.dispatch(asyncAction)
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});
