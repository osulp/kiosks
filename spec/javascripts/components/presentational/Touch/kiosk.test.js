import React from 'react';
import Kiosk from '../../../../../app/assets/javascripts/react/components/presentational/Touch/Kiosk';
import * as factories from '../../../.factories';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

describe('Snapshot', () => {

  const props = {
    slides: factories.slides
  };

  const component = renderer.create(
    <Kiosk {...props} />
  );

  it('should match the cached snapshot', () => {
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
