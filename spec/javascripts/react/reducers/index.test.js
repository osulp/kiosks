import {default as combinedReducers} from '../../../../app/assets/javascripts/react/reducers';

describe('Reducers::RootReducer', () => {
  it('matches the snapshot', () => {
    expect(combinedReducers).toMatchSnapshot();
  });
});