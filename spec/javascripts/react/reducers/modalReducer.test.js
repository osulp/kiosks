import { default as reducerCreator } from "../../../../app/javascript/react/reducers/modalReducer"
import * as actionCreator from "../../../../app/javascript/react/actions/modalActions"

const empty_state = undefined

describe("Reducers::Modal", () => {
  it("matches the snapshot", () => {
    expect(reducerCreator).toMatchSnapshot()
  })
  describe("setModalRootComponent action", () => {
    it("matches the snapshot", () => {
      expect(
        reducerCreator(
          empty_state,
          actionCreator.setModalRootComponent(jest.fn())
        )
      ).toMatchSnapshot()
    })
  })
  describe("setModalVisibility action", () => {
    it("matches the snapshot", () => {
      expect(
        reducerCreator(empty_state, actionCreator.setModalVisibility(true))
      ).toMatchSnapshot()
    })
  })
})
