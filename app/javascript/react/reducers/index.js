import { combineReducers } from "redux"
import kioskReducer from "./kioskReducer"
import modalReducer from "./modalReducer"
import touchReducer from "./touchReducer"
import contentReducer from "./contentReducer"
import circReducer from "./circReducer"

export const REDUCERS_SHAPE = {
  kiosk: kioskReducer,
  modal: modalReducer,
  content: contentReducer,
  touch: touchReducer,
  circ: circReducer
}

export default combineReducers(REDUCERS_SHAPE)
