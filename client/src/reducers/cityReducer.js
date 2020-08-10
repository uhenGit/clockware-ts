import {
  GET_ALL_CITIES,
  POST_NEW_CITY,
  DELETE_CITY,
  INPROCESS,
} from "../actions/types";

const initialState = {
  cities: [],
  isLoad: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INPROCESS:
      return {
        ...state,
        isLoad: true,
      };
    case GET_ALL_CITIES:
      return {
        ...state,
        cities: action.payload,
        isLoad: false,
      };
    case POST_NEW_CITY:
      return {
        ...state,
        isLoad: false,
      };
    case DELETE_CITY:
      return {
        ...state,
        isLoad: false,
      };
    default:
      return state;
  }
};
