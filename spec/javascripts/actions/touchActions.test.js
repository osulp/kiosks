import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// setup
import {ADD_ERROR, SET_SLIDES} from '../../../app/assets/javascripts/react/actions/kioskActions';
import * as actionCreator from '../../../app/assets/javascripts/react/actions/touchActions';
import * as factories from '../.factories';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
const bogus_host = "http://my.server.com";
const bogus_action = "/blah";
const bogus_action_json = `${bogus_action}.json`;
const bogus_url = `${bogus_host}${bogus_action}`;

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
        .reply(200, { slides: factories.slides });

      // The actions that were set in the store during the async call.
      // If an async call dispatches multiple actions, they must be set here.
      const expectedActions = [
        { type: SET_SLIDES, kiosk: { slides: factories.slides } }
      ];
      const store = mockStore({ slides: [] });

      const asyncAction = actionCreator.fetchSlides(bogus_url);
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
        { type: ADD_ERROR, error: { message: nock_error_message , code: factories.error.code } }
      ];
      const store = mockStore({ slides: [] });

      const asyncAction = actionCreator.fetchSlides(bogus_url);
      return store.dispatch(asyncAction)
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});