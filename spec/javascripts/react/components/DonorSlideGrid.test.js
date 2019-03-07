import {
  mapStateToProps,
  mapDispatchToProps
} from "../../../../app/javascript/react/components/DonorSlideGrid"
import * as factories from "../.factories"

describe("Donor SlideGrid", () => {
  it("maps state to props", () => {
    expect(
      mapStateToProps({
        kiosk: { slides: factories.slides, title: factories.slide.title },
        modal: { visible: false }
      })
    ).toMatchSnapshot()
  })

  it("maps dispatch to props", () => {
    expect(mapDispatchToProps(jest.fn())).toMatchSnapshot()
  })
})
