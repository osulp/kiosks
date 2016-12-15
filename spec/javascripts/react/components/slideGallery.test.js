import { mapStateToProps, mapDispatchToProps } from '../../../../app/assets/javascripts/react/components/SlideGallery';
import * as factories from '../.factories';

describe('SlideGallery', () => {
  it('maps state to props', () => {
    expect(mapStateToProps({kiosk: { slides: factories.slides } })).toMatchSnapshot();
  });

  it('maps dispatch to props', () => {
    expect(mapDispatchToProps(jest.fn())).toMatchSnapshot();
  });
});
