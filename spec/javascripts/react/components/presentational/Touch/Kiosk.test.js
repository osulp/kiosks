import React from "react"
import Kiosk from "../../../../../../app/javascript/react/components/presentational/Touch/Kiosk"
import * as factories from "../../../.factories"
import { shallow } from "enzyme"

const setup = () => {
  const props = Object.assign({}, factories.initial_state, {
    slides: factories.slides,
    restart_kiosk: factories.kiosk.restart_kiosk,
    is_fetching_slides: false,
    show_nav: true,
    maps: [],
    hours: {},
    api: {},
    google_analytics: jest.fn(),
    fetchSlides: jest.fn(),
    fetchRestartKiosk: jest.fn(),
    setModalVisibility: jest.fn(),
    setModalRootComponent: jest.fn(),
    scrollToSlide: jest.fn(),
    fetchHours: jest.fn()
  })
  const enzyme_wrapper = shallow(<Kiosk {...props} />)
  return { props, enzyme_wrapper }
}

describe("Touch::Kiosk", () => {
  // simple presentational component to contain the application layout
  it("has a valid id", () => {
    const { enzyme_wrapper } = setup()
    expect(enzyme_wrapper.prop("id")).toEqual("touch_kiosk")
  })
  it("has all required props", () => {
    const { enzyme_wrapper, props } = setup()
    Object.keys(Kiosk.propTypes).forEach(k => expect(props[k]).toBeDefined())
  })
  it("renders child components", () => {
    const { enzyme_wrapper } = setup()
    expect(enzyme_wrapper.find("Connect(ModalWindow)").length).toEqual(1)
    expect(enzyme_wrapper.find("Header").length).toEqual(1)
    expect(enzyme_wrapper.find("Connect(SlideGallery)").length).toEqual(1)
  })
})
