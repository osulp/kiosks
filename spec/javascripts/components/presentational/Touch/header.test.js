import React from 'react';
import Header from '../../../../../app/assets/javascripts/react/components/presentational/Touch/Header';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

describe('Snapshot', () => {

  const component = renderer.create(
    <Header />
  );

  it('should match the cached snapshot', () => {
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
