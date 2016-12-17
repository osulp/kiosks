import {default as reducerCreator} from '../../../../app/assets/javascripts/react/reducers/modalReducer';
import * as actionCreator from '../../../../app/assets/javascripts/react/actions/modalActions';

const empty_state = undefined;

describe('Reducer::Modal', () => {
  describe('default action', () => {
    it('matches the snapshot', () => {
      // execute
      let state = reducerCreator(empty_state, {type: "BOGUS_ACTION"});
      // verify
      expect(state).toMatchSnapshot();
    })
  });
  describe('setModalRootComponent action', () => {
    it('matches the snapshot', () => {
      // execute
      let state = reducerCreator(empty_state, actionCreator.setModalRootComponent(jest.fn()));
      // verify
      expect(state).toMatchSnapshot();
    })
  });
  describe('setModalVisibility action', () => {
    it('matches the snapshot', () => {
      // execute
      let state = reducerCreator(empty_state, actionCreator.setModalVisibility(true));
      // verify
      expect(state).toMatchSnapshot();
    })
  });
});
