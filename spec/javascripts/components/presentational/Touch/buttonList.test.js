import React from 'react';
import { ButtonList } from '../../../../../app/assets/javascripts/react/components/presentational/Touch/ButtonList';
import { shallow } from 'enzyme';

const setup = () => {
  const props = {
    url: "/bogus/url",
    fetchSlides: jest.fn()
  };
  const enzyme_wrapper = shallow(<ButtonList {...props}/>);

  return { props, enzyme_wrapper };
};

describe('Touch::ButtonList', () => {
  it('has a refresh slides button', () => {
    let { enzyme_wrapper, props } = setup();
    expect(enzyme_wrapper.find("li.refresh-slides").text()).toEqual("Refresh Slides");
  });
  it('has an onClick action', () => {
    let { enzyme_wrapper, props } = setup();
    let li = enzyme_wrapper.find('li.refresh-slides');
    li.simulate('click');
    expect(props.fetchSlides.mock.calls.length).toEqual(1);
  });
});
