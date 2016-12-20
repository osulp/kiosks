import React from 'react';
import SlideCell from '../../../../../../app/assets/javascripts/react/components/presentational/Donor/SlideCell';
import { shallow } from 'enzyme';
import * as factories from "../../../.factories";

const setup = () => {
  const props = {
    slide: factories.slide,
    setModalVisibility: jest.fn(),
    setModalRootComponent: jest.fn()
  };
  const enzyme_wrapper = shallow(<SlideCell {...props}/>);
  return { props, enzyme_wrapper };
};

describe('Donor::SlideCell', () => {
  it('has a panel-body', () => {
    const { enzyme_wrapper } = setup();
    expect(enzyme_wrapper.find('.panel-body')).toHaveLength(1);
  });
  it('responds to onClick', () => {
    const {enzyme_wrapper, props} = setup();
    enzyme_wrapper.simulate("click");
    expect(props.setModalRootComponent.mock.calls.length).toEqual(1);
    expect(props.setModalVisibility.mock.calls.length).toEqual(1);
  });
});