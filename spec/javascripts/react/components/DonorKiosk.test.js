import { mapStateToProps, mapDispatchToProps } from '../../../../app/assets/javascripts/react/components/DonorKiosk';
import * as factories from '../.factories';

describe('Donor Kiosk', () => {
  it('maps state to props', () => {
    expect(mapStateToProps({kiosk: {slides: factories.slides, title: factories.slide.title }})).toMatchSnapshot();
  });

  it('maps dispatch to props', () => {
    expect(mapDispatchToProps(jest.fn())).toMatchSnapshot();
  });
});