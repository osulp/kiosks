import * as actionCreator from '../../../../app/assets/javascripts/react/actions/kioskActions';
import * as factories from '../.factories';

describe('Action::Kiosk', () => {
  describe('#addError()', () => {
    it('matches the snapshot', () => {
      // execute
      let action = actionCreator.addError(factories.error);
      // verify
      expect(action).toMatchSnapshot();
    })
  });

  describe('#scrollToSlide()', () => {
    it('matches the snapshot', () => {
      // execute
      let action = actionCreator.scrollToSlide(1);
      // verify
      expect(action).toMatchSnapshot();
    })
  });

  describe('#setSlides()', () => {
    it('matches the snapshot', () => {
      // execute
      let action = actionCreator.setSlides([factories.slides]);
      // verify
      expect(action).toMatchSnapshot();
    })
  });

  describe('#setTitle()', () => {
    it('matches the snapshot', () => {
      // execute
      let action = actionCreator.setTitle("MyTitle");
      // verify
      expect(action).toMatchSnapshot();
    })
  });

  describe('#setKiosk()', () => {
    it('matches the snapshot', () => {
      let expected = factories.kiosk;
      // execute
      let action = actionCreator.setKiosk(expected.type, expected.url);
      // verify
      expect(action).toMatchSnapshot();
    })
  });
});
