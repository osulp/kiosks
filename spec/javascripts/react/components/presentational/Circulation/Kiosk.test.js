import React from "react"
import Kiosk from "../../../../../../app/javascript/react/components/presentational/Circulation/Kiosk"
import * as factories from "../../../.factories"
import { shallow } from "enzyme"

const setup = () => {
  const props = Object.assign({}, factories.initial_state, {
    slides: factories.slides,
    restart_kiosk: factories.kiosk.restart_kiosk,
    is_fetching_slides: false,
    show_nav: false,
    fetchRestartKiosk: jest.fn(),
    fetchSlides: jest.fn(),
    scrollToSlide: jest.fn(),
    rooms_available_count: jest.fn(),
    hours: {},
    api: {},
    fetchHours: jest.fn()
  })
  const enzyme_wrapper = shallow(<Kiosk {...props} />)
  return { props, enzyme_wrapper }
}

describe("Circulation::Kiosk", () => {
  // simple presentational component to contain the application layout
  it("has a valid id", () => {
    const { enzyme_wrapper } = setup()
    expect(enzyme_wrapper.prop("id")).toEqual("circulation_kiosk")
  })
  it("has all required props", () => {
    const { enzyme_wrapper, props } = setup()
    Object.keys(Kiosk.propTypes).forEach(k => expect(props[k]).toBeDefined())
  })
  it("renders child components", () => {
    const { enzyme_wrapper } = setup()
    expect(enzyme_wrapper.find("Header").length).toEqual(1)
    expect(enzyme_wrapper.find("Rooms").length).toEqual(1)
    expect(enzyme_wrapper.find("Connect(SlideGallery)").length).toEqual(1)
  })
})
