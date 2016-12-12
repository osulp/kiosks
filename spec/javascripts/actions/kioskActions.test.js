import { ADD_ERROR, SET_SLIDES, SET_KIOSK } from '../../../app/assets/javascripts/react/actions/kioskActions';

// setup
import * as actionCreator from '../../../app/assets/javascripts/react/actions/kioskActions';
import * as factories from '../.factories';

describe('Action::Kiosk', () => {

  describe('#addError()', () => {
    it('returns action ADD_ERROR info', () => {
      let expected = factories.error;

      // execute
      let action = actionCreator.addError(expected);

      // verify
      expect(action.type).toEqual(ADD_ERROR);
      expect(action.error).toEqual(expected);
    })
  });

  describe('#setSlides()', () => {
    it('returns action SET_SLIDES info', () => {
      let expected = [factories.slide];

      // execute
      let action = actionCreator.setSlides(expected);

      // verify
      expect(action.type).toEqual(SET_SLIDES);
      expect(action.kiosk.slides).toEqual(expected);
    })
  });

  describe('#setKiosk()', () => {
    it('returns action SET_KIOSK info', () => {
      let expected = factories.kiosk;

      // execute
      let action = actionCreator.setKiosk(expected.type, expected.url);

      // verify
      expect(action.type).toEqual(SET_KIOSK);
      expect(action.kiosk).toEqual(expected);
    })
  });
});