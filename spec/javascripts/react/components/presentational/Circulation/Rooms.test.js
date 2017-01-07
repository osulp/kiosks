import Rooms from '../../../../../../app/assets/javascripts/react/components/presentational/Circulation/Rooms';
import React from 'react';
import { shallow } from 'enzyme';
import * as factories from '../../../.factories';
import moment from 'moment';

const setup = () => {
  const now = moment();
  const props = {
    url: "test",
    rooms_available_count: factories.rooms_available_count,
    fetchRoomsAvailableCount: jest.fn()
  };
  const enzyme_wrapper = shallow(<Rooms {...props} />);
  return { props, enzyme_wrapper };
};


describe('Circulation::Rooms', () => {
  beforeAll(() => {
    global.window.$ = jest.fn(() => {return {on: jest.fn()}});
    global.window.FlipClock = jest.fn();
  });
  it('has all required props', () => {
    const {enzyme_wrapper, props} = setup();
    Object.keys(Rooms.propTypes).forEach(k => expect(props[k]).toBeDefined());
  });
  it('has a header', () => {
    let {enzyme_wrapper, props} = setup();
    expect(enzyme_wrapper.find(".circ-sidebar-title")).toHaveLength(1);
  });
  it('has a flip counter', () => {
    let {enzyme_wrapper, props} = setup();
    expect(enzyme_wrapper.find(".circ-counter")).toHaveLength(1);
  });
});
