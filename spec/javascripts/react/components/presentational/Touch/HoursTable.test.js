import HoursTable from "../../../../../../app/javascript/react/components/presentational/Touch/HoursTable"
import React from "react"
import { shallow } from "enzyme"
import * as factories from "../../../.factories"
import moment from "moment"

const setup = () => {
  const now = moment()
  const props = {
    hours: factories.hours,
    selected_date: now
  }
  const enzyme_wrapper = shallow(<HoursTable {...props} />)
  return { props, enzyme_wrapper }
}

describe("HoursTable", () => {
  it("has all required props", () => {
    const { enzyme_wrapper, props } = setup()
    Object.keys(HoursTable.propTypes).forEach(k =>
      expect(props[k]).toBeDefined()
    )
  })
  it("has a table", () => {
    let { enzyme_wrapper, props } = setup()
    expect(enzyme_wrapper.find(".hours-table")).toHaveLength(1)
  })
  it("has a row", () => {
    let { enzyme_wrapper, props } = setup()
    expect(enzyme_wrapper.find(".hours-table tbody tr")).toHaveLength(1)
  })
})
