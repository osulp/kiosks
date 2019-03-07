import { default as configureStore } from "../../../../app/javascript/react/store/configureStore"

const empty_state = undefined

describe("Store::configureStore", () => {
  it("matches the snapshot", () => {
    expect(configureStore).toMatchSnapshot()
  })
  it("creates a default store with middleware", () => {
    expect(configureStore(empty_state)).toMatchSnapshot()
  })
})
