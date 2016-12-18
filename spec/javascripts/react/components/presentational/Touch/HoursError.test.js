import HoursError from '../../../../../../app/assets/javascripts/react/components/presentational/Touch/HoursError';
import React from 'react';
import { shallow } from 'enzyme';


const setup = () => {
  const props = {error: "test"};
  const enzyme_wrapper = shallow(<HoursError {...props} />);
  return { props, enzyme_wrapper };
};

describe('HoursError', () => {
  it('displays an error', () => {
    let {enzyme_wrapper, props} = setup();
    expect(enzyme_wrapper.find(".glyphicon")).toHaveLength(1);
    expect(enzyme_wrapper.find("span").last().text()).toEqual(props.error);
  });
});
