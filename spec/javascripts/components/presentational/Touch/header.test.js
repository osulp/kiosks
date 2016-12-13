import React from 'react';
import Header from '../../../../../app/assets/javascripts/react/components/presentational/Touch/Header';
import { shallow } from 'enzyme';

const setup = () => {
  const props = {
    url: "bogus",
    fetchSlides: jest.fn()
  };
  const enzyme_wrapper = shallow(<Header {...props}/>);
  return { props, enzyme_wrapper };
};

describe('Touch::Header', () => {
  it('has an image', () => {
    const { enzyme_wrapper } = setup();
    expect(enzyme_wrapper.find('img').hasClass('logo')).toBeTruthy();
  });
});
