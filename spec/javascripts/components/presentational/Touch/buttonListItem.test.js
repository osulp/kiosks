import React from 'react';
import { ButtonListItem } from '../../../../../app/assets/javascripts/react/components/presentational/Touch/ButtonListItem';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

describe('Snapshot', () => {

  const props = {
    role: "main",
    className: "class",
    text: "blah",
    onButtonClick: jest.fn()
  };

  const component = renderer.create(
    <ButtonListItem {...props} />
  );

  it('should match the cached snapshot', () => {
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('runs a callback onClick', () => {
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // manually trigger the callback
    tree.props.onClick();
    expect(props.onButtonClick.mock.calls.length).toEqual(1);
  });

  it('does not change the state of the component onClick', () => {
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    // manually trigger the callback
    tree.props.onClick();

    // re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
