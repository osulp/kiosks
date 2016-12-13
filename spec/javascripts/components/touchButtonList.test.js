import { mapStateToProps, mapDispatchToProps } from '../../../app/assets/javascripts/react/components/TouchButtonList';
import * as factories from '../.factories';

describe('TouchButtonList', () => {
  it('maps state to props', () => {
    expect(mapStateToProps({kiosk: { url: "test" } })).toMatchSnapshot();
  });

  it('maps dispatch to props', () => {
    expect(mapDispatchToProps(jest.fn())).toMatchSnapshot();
  });
});
