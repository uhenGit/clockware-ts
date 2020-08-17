import {
  GET_ALL_MASTERS,
  POST_NEW_MASTER,
  INPROCESS,
  DELETE_MASTER,
} from "../actions/types";

const initialState = {
  masters: [],
  isLoad: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INPROCESS:
      return {
        ...state,
        isLoad: true,
      };
    case GET_ALL_MASTERS:
      //console.log("reducer get all masters paayload: ", action.payload);
      return {
        ...state,
        masters: action.payload,
        isLoad: false,
      };
    case POST_NEW_MASTER:
      console.log("reducer post new master payload: ", action.payload);
      return {
        ...state,
        masters: [action.payload, ...state.masters],
        isLoad: false,
      };
    case DELETE_MASTER:
      return {
        ...state,
        masters: state.masters.filter((master) => master.id !== action.payload),
        isLoad: false,
      };
    default:
      return state;
  }
};
