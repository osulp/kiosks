import {default as reducerCreator} from '../../../../app/assets/javascripts/react/reducers/kioskReducer';
import * as actionCreator from '../../../../app/assets/javascripts/react/actions/kioskActions';
import * as factories from '../.factories';

const empty_state = undefined;

describe('Reducers::Kiosk', () => {
  it('matches the snapshot', () => {
    expect(reducerCreator).toMatchSnapshot();
  });
  describe('addError action', () => {
    it('matches the snapshot', () => {
      expect(reducerCreator(empty_state, actionCreator.addError(factories.error))).toMatchSnapshot();
    })
  });
  describe('setKiosk action', () => {
    it('matches the snapshot', () => {
      expect(reducerCreator(empty_state, actionCreator.setKiosk(factories.kiosk))).toMatchSnapshot();
    })
  });
  describe('setSlides action', () => {
    it('matches the snapshot', () => {
      expect(reducerCreator(empty_state, actionCreator.setSlides(factories.slides))).toMatchSnapshot();
    })
  });
  describe('setRestartKiosk action', () => {
    it('matches the snapshot', () => {
      expect(reducerCreator(empty_state, actionCreator.setRestartKiosk(factories.kiosk.restart_kiosk))).toMatchSnapshot();
    })
  });
  describe('scrollToSlide action', () => {
    it('matches the snapshot', () => {
      expect(reducerCreator(empty_state, actionCreator.scrollToSlide(1))).toMatchSnapshot();
    })
  });
  describe('setTitle action', () => {
    it('matches the snapshot', () => {
      expect(reducerCreator(empty_state, actionCreator.setTitle("MyTitle"))).toMatchSnapshot();
    })
  });
});
