import {
  GET_ALL_ORDERS,
  POST_NEW_ORDER,
  INPROCESS
} from "../actions/types";

const initialState = {
  orders: [],
  isLoad: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INPROCESS:
      return {
        ...state,
        isLoad: true,
      };
    case POST_NEW_ORDER:
      return {
        ...state,
        orders: [action.payload, ...state.orders],
          isLoad: false,
      };
    case GET_ALL_ORDERS:
      console.log("get all orders reducer: ", action.payload);
      return {
        ...state,
        orders: action.payload,
          isLoad: false,
      };
    default:
      return state;
  }
};