import React from 'react';
import Error from '../../../../../app/assets/javascripts/react/components/presentational/shared/Error';
import * as factories from '../../../.factories';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

describe('Snapshot', () => {

  const props = {
    errors: [factories.error],
    fetchSlides: jest.fn()
  };

  const component = renderer.create(
    <Error {...props} />
  );

  it('should match the cached snapshot', () => {
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
