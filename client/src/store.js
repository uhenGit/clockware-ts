import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const initialState = {};
const mw = [thunk];
const store = createStore(rootReducer, initialState, applyMiddleware(...mw));
export default store;
