import {
  mapStateToProps,
  mapDispatchToProps
} from "../../../../app/javascript/react/components/DonorKiosk"
import * as factories from "../.factories"

describe("Donor Kiosk", () => {
  it("maps state to props", () => {
    expect(
      mapStateToProps({
        kiosk: {
          slides: factories.slides,
          title: factories.slide.title,
          restart_kiosk: factories.kiosk.restart_kiosk
        }
      })
    ).toMatchSnapshot()
  })

  it("maps dispatch to props", () => {
    expect(mapDispatchToProps(jest.fn())).toMatchSnapshot()
  })
})
