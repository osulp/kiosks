import { default as reducerCreator } from "../../../../app/javascript/react/reducers/touchReducer"
import * as actionCreator from "../../../../app/javascript/react/actions/touchActions"
import * as factories from "../.factories"

const empty_state = undefined

describe("Reducers::Touch", () => {
  it("matches the snapshot", () => {
    expect(reducerCreator).toMatchSnapshot()
  })
  describe("fetchingSlides action", () => {
    it("matches the snapshot", () => {
      expect(
        reducerCreator(empty_state, actionCreator.fetchingSlides())
      ).toMatchSnapshot()
    })
  })
  describe("fetchingHours action", () => {
    it("matches the snapshot", () => {
      expect(
        reducerCreator(empty_state, actionCreator.fetchingHours())
      ).toMatchSnapshot()
    })
  })
  describe("fetchedSlides action", () => {
    it("matches the snapshot", () => {
      expect(
        reducerCreator(empty_state, actionCreator.fetchedSlides())
      ).toMatchSnapshot()
    })
  })
  describe("fetchedHours action", () => {
    it("matches the snapshot", () => {
      expect(
        reducerCreator(empty_state, actionCreator.fetchedHours())
      ).toMatchSnapshot()
    })
  })
  describe("setHours action", () => {
    it("matches the snapshot", () => {
      expect(
        reducerCreator(empty_state, actionCreator.setHours(factories.hours))
      ).toMatchSnapshot()
    })
  })
  describe("fetchedClassroomSchedule action", () => {
    it("matches the snapshot", () => {
      expect(
        reducerCreator(empty_state, actionCreator.fetchedClassroomSchedule())
      ).toMatchSnapshot()
    })
  })
  describe("fetchingClassroomSchedule action", () => {
    it("matches the snapshot", () => {
      expect(
        reducerCreator(empty_state, actionCreator.fetchingClassroomSchedule())
      ).toMatchSnapshot()
    })
  })
  describe("fetchedClassrooms action", () => {
    it("matches the snapshot", () => {
      expect(
        reducerCreator(empty_state, actionCreator.fetchedClassrooms())
      ).toMatchSnapshot()
    })
  })
  describe("fetchingClassrooms action", () => {
    it("matches the snapshot", () => {
      expect(
        reducerCreator(empty_state, actionCreator.fetchingClassrooms())
      ).toMatchSnapshot()
    })
  })
  describe("setClassroomSchedule action", () => {
    it("matches the snapshot", () => {
      expect(
        reducerCreator(
          empty_state,
          actionCreator.setClassroomSchedule(
            factories.classroom_schedule,
            "20170110"
          )
        )
      ).toMatchSnapshot()
    })
  })
  describe("setMaps action", () => {
    it("matches the snapshot", () => {
      expect(
        reducerCreator(empty_state, actionCreator.setMaps(factories.map))
      ).toMatchSnapshot()
    })
  })
  describe("toggleClassroomSelected action", () => {
    it("matches the snapshot", () => {
      let the_state = { classrooms: { test_shortname: factories.classroom } }
      expect(
        reducerCreator(
          the_state,
          actionCreator.toggleClassroomSelected(
            factories.classroom.shortname,
            false
          )
        )
      ).toMatchSnapshot()
    })
  })
})
