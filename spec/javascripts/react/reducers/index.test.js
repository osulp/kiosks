import {REDUCERS_SHAPE} from '../../../../app/assets/javascripts/react/reducers';
import * as combinedReducers from '../../../../app/assets/javascripts/react/reducers';

describe('Reducer::Root', () => {
  describe('Redux combinedReducers', () => {
    it('matches the snapshot', () => {
      expect(combinedReducers).toMatchSnapshot();
    });
  });
  describe('Reducers state shape', () => {
    it('matches the snapshot', () => {
      expect(REDUCERS_SHAPE).toMatchSnapshot();
    });
  });
});
