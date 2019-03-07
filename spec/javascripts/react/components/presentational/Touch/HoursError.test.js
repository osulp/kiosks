import HoursError from "../../../../../../app/javascript/react/components/presentational/Touch/HoursError"
import React from "react"
import { shallow } from "enzyme"

const setup = () => {
  const props = { error: "test" }
  const enzyme_wrapper = shallow(<HoursError {...props} />)
  return { props, enzyme_wrapper }
}

describe("HoursError", () => {
  it("has all required props", () => {
    const { enzyme_wrapper, props } = setup()
    Object.keys(HoursError.propTypes).forEach(k =>
      expect(props[k]).toBeDefined()
    )
  })
  it("displays an error", () => {
    let { enzyme_wrapper, props } = setup()
    expect(enzyme_wrapper.find(".glyphicon")).toHaveLength(1)
    expect(
      enzyme_wrapper
        .find("span")
        .last()
        .text()
    ).toEqual(props.error)
  })
})
