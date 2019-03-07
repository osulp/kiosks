import Hours from "../../../../../../app/javascript/react/components/presentational/Touch/Hours"
import { getWeekArray } from "../../../../../../app/javascript/react/components/presentational/Touch/Hours"
import React from "react"
import { shallow } from "enzyme"
import * as factories from "../../../.factories"

const setup = hours_error => {
  const props = {
    hours: hours_error || factories.hours,
    kiosk_name: "test",
    kiosk_id: "1",
    api: { hours: "/some/bogus/url" },
    google_analytics: jest.fn(),
    is_fetching_hours: false,
    fetchHours: jest.fn()
  }
  const enzyme_wrapper = shallow(<Hours {...props} />)
  return { props, enzyme_wrapper }
}

describe("Hours", () => {
  it("has all required props", () => {
    const { enzyme_wrapper, props } = setup()
    Object.keys(Hours.propTypes).forEach(k => expect(props[k]).toBeDefined())
  })
  it("has the div", () => {
    let { enzyme_wrapper, props } = setup()
    expect(enzyme_wrapper.find("#hours")).toHaveLength(1)
  })
  it("has a DatePicker", () => {
    let { enzyme_wrapper, props } = setup()
    expect(enzyme_wrapper.find("Picker")).toHaveLength(1)
  })
  it("renders an error", () => {
    let { enzyme_wrapper, props } = setup({ error: "Bob Ross" })
    console.log(enzyme_wrapper.debug())
    expect(enzyme_wrapper.find("HoursError")).toHaveLength(1)
  })
  it("returns a week array", () => {
    expect(getWeekArray("2016-12-20")).toHaveLength(7)
  })
  it("sets state and fetches hours", () => {
    let { enzyme_wrapper, props } = setup()
    const inst = enzyme_wrapper.instance()
    inst.dateClicked("2016-12-20")
    expect(props.fetchHours.mock.calls).toHaveLength(1)
  })
  it("componentDidMount fetches hours", () => {
    let { enzyme_wrapper, props } = setup()
    const inst = enzyme_wrapper.instance()
    inst.componentDidMount()
    expect(props.fetchHours.mock.calls).toHaveLength(1)
  })
})
