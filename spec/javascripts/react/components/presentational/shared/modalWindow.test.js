import React from 'react';
import ModalWindow from '../../../../../../app/assets/javascripts/react/components/presentational/shared/ModalWindow';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

const setup = (args) => {

  const props = {
    visible: args.visible,
    root_component: args.element,
    setModalVisibility: jest.fn(),
    setModalRootComponent: jest.fn()
  };

  const component = renderer.create(
    <ModalWindow {...props} />
  );

  return { props, component };
};

describe('Snapshot', () => {
  it('matches the cached snapshot', () => {
    let {component} = setup({visible: true, element: React.createElement("H1", {}, "test")});
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
describe('Shared::ModalWindow', () => {
  it('logs a console.error when visible with no root_component', () => {
    global.console = jest.fn();
    global.console.error = jest.fn();
    let { component } = setup({visible: true, element: undefined });
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(global.console.error.mock.calls.length).toEqual(1);
  });
  it('can be closed', () => {
    let {component, props} = setup({visible: true, element: React.createElement("H1", {}, "test")});
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    tree.props.onClick({target: {id: "modal"}});
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    expect(props.setModalRootComponent.mock.calls.length).toEqual(1);
    expect(props.setModalVisibility.mock.calls.length).toEqual(1);
  });
});

