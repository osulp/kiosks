import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {ADD_ERROR, SET_SLIDES, SET_RESTART_KIOSK} from '../../../../app/assets/javascripts/react/actions/kioskActions';
import {FETCHING_ROOMS_AVAILABLE_COUNT, FETCHED_ROOMS_AVAILABLE_COUNT, SET_ROOMS_AVAILABLE_COUNT} from '../../../../app/assets/javascripts/react/actions/circActions';
import * as actionCreator from '../../../../app/assets/javascripts/react/actions/circActions';
import * as factories from '../.factories';
import moment from 'moment';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const bogus_host = "http://my.server.com";
const bogus_action = "/blah";
const bogus_action_json = `${bogus_action}.json`;
const bogus_action_url = `${bogus_host}${bogus_action}`;
const bogus_rooms_available_count = "/api/v1/rooms/available/";
// const date = "20160224120000"

const test_date = new Date("2016/02/24 12:00:00");
const parsed_test_date = moment(test_date).format("YYYYMMDDhhmmss");
const bogus_rooms_available_count_url = `${bogus_host}${bogus_rooms_available_count}`;

describe('Action::Circulation', () => {
  describe('#fetchRoomsAvailableCount()', () => {
    // reset the http mock state
    afterEach(() => {
      nock.cleanAll()
    });

    it('should work', () => {
      // Mock the HTTP call and return what is expected from the server
      nock(bogus_host)
        .get(bogus_rooms_available_count)
        .reply(200, factories.rooms_available_count);

      // The actions that were set in the store during the async call.
      // If an async call dispatches multiple actions, they must be set here.
      const expectedActions = [
        {type: FETCHING_ROOMS_AVAILABLE_COUNT},
        {data: {date: parsed_test_date, rooms_available_count: factories.rooms_available_count}, type: SET_ROOMS_AVAILABLE_COUNT}
      ];
      const store = mockStore({rooms_available_count: []});

      const asyncAction = actionCreator.fetchRoomsAvailableCount(bogus_rooms_available_count_url, test_date);
      return store.dispatch(asyncAction)
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  });
});
