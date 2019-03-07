import {default as reducerCreator} from '../../../../app/assets/javascripts/react/reducers/touchReducer';
import * as actionCreator from '../../../../app/assets/javascripts/react/actions/touchActions';
import * as factories from '../.factories';

const empty_state = undefined;

describe('Reducers::Touch', () => {
  it('matches the snapshot', () => {
    expect(reducerCreator).toMatchSnapshot();
  });
  describe('fetchingSlides action', () => {
    it('matches the snapshot', () => {
      expect(reducerCreator(empty_state, actionCreator.fetchingSlides())).toMatchSnapshot();
    })
  });
  describe('fetchingHours action', () => {
    it('matches the snapshot', () => {
      expect(reducerCreator(empty_state, actionCreator.fetchingHours())).toMatchSnapshot();
    })
  });
  describe('fetchedSlides action', () => {
    it('matches the snapshot', () => {
      expect(reducerCreator(empty_state, actionCreator.fetchedSlides())).toMatchSnapshot();
    })
  });
  describe('fetchedHours action', () => {
    it('matches the snapshot', () => {
      expect(reducerCreator(empty_state, actionCreator.fetchedHours())).toMatchSnapshot();
    })
  });
  describe('setHours action', () => {
    it('matches the snapshot', () => {
      expect(reducerCreator(empty_state, actionCreator.setHours(factories.hours))).toMatchSnapshot();
    })
  });
  describe('setMaps action', () => {
    it('matches the snapshot', () => {
      expect(reducerCreator(empty_state, actionCreator.setMaps(factories.map))).toMatchSnapshot();
    })
  });
});
