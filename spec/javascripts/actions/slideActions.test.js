import { SET_SLIDES, REFRESH_SLIDES } from '../../../app/assets/javascripts/components/actions/slideActions';

// setup
import * as actionCreator from '../../../app/assets/javascripts/components/actions/slideActions';
import * as factories from '../.factories';

describe('Action::Slide', () => {
  describe('#setSlides()', () => {
    it('returns action SET_SLIDES info', () => {
      let expected = factories.slide;

      // execute
      let action = actionCreator.setSlides(expected);

      // verify
      expect(action.type).to.equal(SET_SLIDES);
      expect(action.slides).to.deep.equal(expected);
    })
  })
});