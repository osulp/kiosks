import React from 'react';
import ButtonList from '../../../../../app/assets/javascripts/react/components/presentational/Touch/ButtonList';
import { ButtonListItem } from '../../../../../app/assets/javascripts/react/components/presentational/Touch/ButtonListItem';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

describe('Snapshot ', () => {

  const props = {
    url: "/bogus/url",
    fetchSlides: jest.fn()
  };

  const component = renderer.create( <ButtonList {...props} /> );
  const enzyme_wrapper = shallow(<ButtonList {...props}/>);

  it('matches the cached snapshot', () => {
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('has a refresh slides button', () => {
    let list_items = enzyme_wrapper.find(ButtonListItem);
    console.log(list_items);
    let list_item = list_items.findWhere(li => li.prop('text') == "Refresh Slides");
    expect(list_item.length).toEqual(1);
  });
});
