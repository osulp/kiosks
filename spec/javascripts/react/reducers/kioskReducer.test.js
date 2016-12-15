import { ADD_ERROR, SET_KIOSK, SET_SLIDES } from '../../../../app/assets/javascripts/react/actions/kioskActions';
import kioskReducer from '../../../../app/assets/javascripts/react/reducers/kioskReducer';
import * as factories from '../.factories';

describe('Reducers::Kiosk', () => {
  it('returns a default state', () => {
    // setup
    let expected = { type: 'unknown' };

    // execute without an existing state
    let newState = kioskReducer(undefined, expected);

    // verify
    expect(newState).toEqual(factories.initial_state);
  });

  describe('on ADD_ERROR', () => {
    it('returns the new state', () => {
      let expected = {
        type: ADD_ERROR,
        error: factories.error
      };

      // execute
      let newState = kioskReducer(undefined, expected);

      // verify
      expect(newState.errors).toEqual([expected.error]);
    })
  });

  describe('on SET_SLIDES', () => {
    it('returns the new state', () => {
      let expected = {
        type: SET_SLIDES,
        kiosk: {
          slides: factories.slides
        }
      };

      // execute without an existing state
      let newState = kioskReducer(undefined, expected);

      // verify
      expect(newState.slides).toEqual(expected.kiosk.slides);
    })
  });

  describe('on SET_KIOSK', () => {
    it('returns the new state', () => {
      let expected = {
        type: SET_KIOSK,
        kiosk: { type: "bob", url: "ross"}
      };

      // execute
      let newState = kioskReducer(undefined, expected);

      // verify
      expect({type: newState.type, url: newState.url}).toEqual(expected.kiosk);
    })
  });
});