import {default as reducerCreator} from '../../../../app/assets/javascripts/react/reducers/touchReducer';
import * as actionCreator from '../../../../app/assets/javascripts/react/actions/touchActions';
import * as factories from '../.factories';

const empty_state = undefined;

describe('Reducer::Touch', () => {
  describe('default action', () => {
    it('matches the snapshot', () => {
      // execute
      let state = reducerCreator(empty_state, {type: "BOGUS_ACTION"});
      // verify
      expect(state).toMatchSnapshot();
    })
  });
  describe('fetchingSlides action', () => {
    it('matches the snapshot', () => {
      // execute
      let state = reducerCreator(empty_state, actionCreator.fetchingSlides());
      // verify
      expect(state).toMatchSnapshot();
    })
  });
  describe('fetchingHours action', () => {
    it('matches the snapshot', () => {
      // execute
      let state = reducerCreator(empty_state, actionCreator.fetchingHours());
      // verify
      expect(state).toMatchSnapshot();
    })
  });
  describe('fetchedSlides action', () => {
    it('matches the snapshot', () => {
      // execute
      let state = reducerCreator(empty_state, actionCreator.fetchedSlides());
      // verify
      expect(state).toMatchSnapshot();
    })
  });
  describe('fetchedHours action', () => {
    it('matches the snapshot', () => {
      // execute
      let state = reducerCreator(empty_state, actionCreator.fetchedHours());
      // verify
      expect(state).toMatchSnapshot();
    })
  });
  describe('setHours action', () => {
    it('matches the snapshot', () => {
      // execute
      let state = reducerCreator(empty_state, actionCreator.setHours(factories.hours));
      // verify
      expect(state).toMatchSnapshot();
    })
  });
});
