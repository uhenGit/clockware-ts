import {
  GET_ALL_MASTERS,
  POST_NEW_MASTER,
  INPROCESS,
  DELETE_MASTER,
} from "../actions/types";

const initialState = {
  masters: [],
  isLoad: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INPROCESS:
      return {
        ...state,
        isLoad: true,
      };
    case GET_ALL_MASTERS:
      return {
        ...state,
        masters: action.payload,
        isLoad: false,
      };
    case POST_NEW_MASTER:
      return {
        ...state,
        isLoad: false,
      };
    case DELETE_MASTER:
      return {
        ...state,
        isLoad: false,
      };
    default:
      return state;
  }
};
