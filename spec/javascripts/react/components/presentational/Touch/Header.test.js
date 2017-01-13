import React from 'react';
import Header from '../../../../../../app/assets/javascripts/react/components/presentational/Touch/Header';
import {shallow} from 'enzyme';
import * as factories from '../../../.factories';

const setup = () => {
  const props = {
    url: "bogus",
    fetchSlides: jest.fn(),
    scrollToSlide: jest.fn(),
    setModalRootComponent: jest.fn(),
    setModalVisibility: jest.fn(),
    maps: [factories.map],
    hours: {},
    is_fetching_slides: false
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
  it('has a maps button', () => {
    const {enzyme_wrapper} = setup();
    expect(enzyme_wrapper.find('.show-maps')).toHaveLength(1);
  });
  it('responds to maps button click', () => {
    const {enzyme_wrapper, props} = setup();
    let button = enzyme_wrapper.find('.show-maps');
    button.simulate('click');
    expect(props.setModalRootComponent.mock.calls).toHaveLength(1);
    expect(props.setModalVisibility.mock.calls).toHaveLength(1);
  });
  it('has an hours button', () => {
    const {enzyme_wrapper} = setup();
    expect(enzyme_wrapper.find('.show-hours')).toHaveLength(1);
  });
  it('responds to hours button click', () => {
    const {enzyme_wrapper, props} = setup();
    let button = enzyme_wrapper.find('.show-hours');
    button.simulate('click');
    expect(props.setModalRootComponent.mock.calls).toHaveLength(1);
    expect(props.setModalVisibility.mock.calls).toHaveLength(1);
  });
});
