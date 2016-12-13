import React from 'react';
import Kiosk from '../../../../../app/assets/javascripts/react/components/presentational/Touch/Kiosk';
import * as factories from '../../../.factories';
import { shallow } from 'enzyme';

const setup = () => {
  const props = { slides: factories.slides };
  const enzyme_wrapper = shallow(<Kiosk {...props}/>);
  return { props, enzyme_wrapper };
};

describe('Touch::Kiosk', () => {
  it('has a valid id', () => {
    const { enzyme_wrapper } = setup();
    expect(enzyme_wrapper.prop('id')).toEqual('touch_kiosk');
  });
});
