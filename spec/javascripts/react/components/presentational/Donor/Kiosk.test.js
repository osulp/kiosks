import React from 'react';
import Kiosk from '../../../../../../app/assets/javascripts/react/components/presentational/Donor/Kiosk';
import * as factories from '../../../.factories';
import {shallow} from 'enzyme';

const setup = () => {
  const props = Object.assign({},
    factories.initial_state,
    {
      slides: factories.slides,
      setModalVisibility: jest.fn(),
      setModalRootComponent: jest.fn(),
      title: "Bogus actual text title",
      setTitle: jest.fn(),
      is_modal_visible: false,
    });
  const enzyme_wrapper = shallow(<Kiosk {...props}/>);
  return {props, enzyme_wrapper};
};

describe('Donor::Kiosk', () => {
  // simple presentational component to contain the application layout
  it('has a valid id', () => {
    const {enzyme_wrapper} = setup();
    expect(enzyme_wrapper.prop('id')).toEqual('donor_kiosk');
  });
  it('has all required props', () => {
    const {props} = setup();
    Object.keys(Kiosk.propTypes).forEach(k => expect(props[k]).toBeDefined());
  });
  it('renders child components', () => {
    const{enzyme_wrapper} = setup();
    expect(enzyme_wrapper.find('Connect(ModalWindow)').length).toEqual(1);
    expect(enzyme_wrapper.find('Connect(SlideGrid)').length).toEqual(1);
  });
});
