import React from 'react';
import * as actionCreator from '../../../../app/assets/javascripts/react/actions/modalActions';

describe('Action::Modal', () => {
  describe('#setModalRootComponent()', () => {
    it('matches the snapshot', () => {
      let expected = React.createElement("H1", {}, "test");
      // execute
      let action = actionCreator.setModalRootComponent(expected);
      // verify
      expect(action).toMatchSnapshot();
    })
  });
  describe('#setModalVisibility()', () => {
    it('matches the snapshot', () => {
      // execute
      let action = actionCreator.setModalVisibility(true);
      // verify
      expect(action).toMatchSnapshot();
    })
  });
});