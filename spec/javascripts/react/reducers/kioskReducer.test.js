import {default as reducerCreator} from '../../../../app/assets/javascripts/react/reducers/kioskReducer';
import * as actionCreator from '../../../../app/assets/javascripts/react/actions/kioskActions';
import * as factories from '../.factories';

const empty_state = undefined;

describe('Reducer::Kiosk', () => {
  describe('default action', () => {
    it('matches the snapshot', () => {
      // execute
      let state = reducerCreator(empty_state, {type: "BOGUS_ACTION"});
      // verify
      expect(state).toMatchSnapshot();
    })
  });
  describe('addError action', () => {
    it('matches the snapshot', () => {
      // execute
      let state = reducerCreator(empty_state, actionCreator.addError(factories.error));
      // verify
      expect(state).toMatchSnapshot();
    })
  });
  describe('setKiosk action', () => {
    it('matches the snapshot', () => {
      // execute
      let state = reducerCreator(empty_state, actionCreator.setKiosk(factories.kiosk));
      // verify
      expect(state).toMatchSnapshot();
    })
  });
  describe('setSlides action', () => {
    it('matches the snapshot', () => {
      // execute
      let state = reducerCreator(empty_state, actionCreator.setSlides(factories.slides));
      // verify
      expect(state).toMatchSnapshot();
    })
  });
  describe('scrollToSlide action', () => {
    it('matches the snapshot', () => {
      // execute
      let state = reducerCreator(empty_state, actionCreator.scrollToSlide(1));
      // verify
      expect(state).toMatchSnapshot();
    })
  });
});
