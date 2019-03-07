import { default as combinedReducers } from "../../../../app/javascript/react/reducers"

describe("Reducers::RootReducer", () => {
  it("matches the snapshot", () => {
    expect(combinedReducers).toMatchSnapshot()
  })
})
