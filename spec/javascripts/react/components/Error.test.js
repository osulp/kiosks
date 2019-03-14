import {
  mapStateToProps,
  mapDispatchToProps
} from "../../../../app/javascript/react/components/Error"
import * as factories from "../.factories"

describe("Error", () => {
  it("maps state to props", () => {
    expect(
      mapStateToProps({ kiosk: { errors: [factories.error] } })
    ).toMatchSnapshot()
  })

  it("maps dispatch to props", () => {
    expect(mapDispatchToProps(jest.fn())).toMatchSnapshot()
  })
})
