import { SET_SLIDES, REFRESH_SLIDES } from '../../../app/assets/javascripts/components/actions/slideActions';

// setup
import slideReducer from '../../../app/assets/javascripts/components/reducers/slideReducer';
import * as factories from '../.factories';

describe('Reducer::Slide', () => {
  it('returns an empty hash as default state', () => {
    // setup
    let expected = { type: 'unknown' };

    // execute
    let newState = slideReducer(undefined, expected);

    // verify
    expect(newState).to.deep.equal({});
  });

  describe('on SET_SLIDES', () => {
    it('returns the new state', () => {
      let expected = {
        type: SET_SLIDES,
        slides: factories.slides
      };

      // execute
      let newState = slideReducer(undefined, expected);

      // verify
      expect(newState).to.deep.equal(expected.slides);
    })
  })
});