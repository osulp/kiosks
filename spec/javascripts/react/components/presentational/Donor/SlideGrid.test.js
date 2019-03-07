import React from "react"
import SlideGrid from "../../../../../../app/javascript/react/components/presentational/Donor/SlideGrid"
import { shallow } from "enzyme"
import * as factories from "../../../.factories"

const setup = () => {
  const new_slide = Object.assign({}, factories.slide, {
    slide_type: "Our Supporters"
  })
  const props = {
    slides: [...factories.slide, new_slide],
    setModalVisibility: jest.fn(),
    setModalRootComponent: jest.fn(),
    title: factories.slide.slide_type,
    setTitle: jest.fn(),
    is_modal_visible: false
  }
  const enzyme_wrapper = shallow(<SlideGrid {...props} />)
  return { props, enzyme_wrapper }
}

describe("Donor::SlideGrid", () => {
  it("has a title", () => {
    const { enzyme_wrapper, props } = setup()
    expect(enzyme_wrapper.text()).toContain(props.title)
  })
  it("has 3 buttons", () => {
    const { enzyme_wrapper, props } = setup()
    expect(enzyme_wrapper.find("button")).toHaveLength(3)
  })
  it("simulates an onclick for Our Supporters", () => {
    const { enzyme_wrapper, props } = setup()
    enzyme_wrapper
      .find("button")
      .findWhere(b => b.prop("data-slidetype") == "Our Supporters")
      .simulate("click", {
        target: { dataset: { slide_type: "Our Supporters" } }
      })
    expect(props.setTitle.mock.calls).toHaveLength(1)
  })
})
