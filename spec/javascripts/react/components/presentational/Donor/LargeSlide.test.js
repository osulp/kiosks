import React from 'react';
import LargeSlide from '../../../../../../app/assets/javascripts/react/components/presentational/Donor/LargeSlide';
import {shallow} from 'enzyme';
import * as factories from "../../../.factories";

const setup = () => {
  const props = {
    slide: factories.slide,
    setModalVisibility: jest.fn(),
    setModalRootComponent: jest.fn()
  };
  const enzyme_wrapper = shallow(<LargeSlide {...props}/>);
  return {props, enzyme_wrapper};
};

describe('Donor::LargeSlide', () => {
  it('has a xlarge image', () => {
    const {enzyme_wrapper, props} = setup();
    expect(enzyme_wrapper.find('img').prop('src')).toEqual(props.slide.xlarge);
  });
  it('has a title', () => {
    const {enzyme_wrapper, props} = setup();
    expect(enzyme_wrapper.text()).toContain(props.slide.title);
  });
  it('has a caption', () => {
    const {enzyme_wrapper, props} = setup();
    expect(enzyme_wrapper.text()).toContain(props.slide.caption);
  });
});