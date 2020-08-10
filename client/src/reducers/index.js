import { combineReducers } from "redux";
import clientReducer from "./clientReducer";
import cityReducer from "./cityReducer";
import masterReducer from "./masterReducer";

export default combineReducers({
  clients: clientReducer,
  cities: cityReducer,
  masters: masterReducer,
});
