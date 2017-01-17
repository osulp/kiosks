import React from 'react';
import Header from '../../../../../../app/assets/javascripts/react/components/presentational/Circulation/Header';
import {shallow} from 'enzyme';
import * as factories from '../../../.factories';

const setup = () => {
  const props = {
    url: "bogus",
    fetchSlides: jest.fn(),
    scrollToSlide: jest.fn(),
    is_fetching_slides: false,
    hours: {},
  };
  const enzyme_wrapper = shallow(<Header {...props}/>);
  return {props, enzyme_wrapper};
};

describe('Touch::Header', () => {
  it('has all required props', () => {
    const {props} = setup();
    Object.keys(Header.propTypes).forEach(k => expect(props[k]).toBeDefined());
  });
  it('has an image', () => {
    const {enzyme_wrapper} = setup();
    expect(enzyme_wrapper.find('img').hasClass('logo')).toBeTruthy();
  });
});
