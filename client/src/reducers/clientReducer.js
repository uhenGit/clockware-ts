import {
  INPROCESS,
  GET_ALL_CLIENTS,
  LOGIN,
  LOGIN_ERROR,
  LOGOUT,
  POST_NEW_CLIENT,
  POST_NEW_CLIENT_ERROR,
  //UPDATE_CLIENT,
  DELETE_CLIENT,
  GET_ONE_CLIENT,
} from "../actions/types";

const initialState = {
  isAuth: false,
  isLoad: false,
  isSignin: false,
  client: null,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case INPROCESS:
      return {
        ...state,
        isLoad: true,
      };
    case GET_ALL_CLIENTS:
      return {
        ...state,
        isAuth: true,
        client: action.payload,
      };
    case GET_ONE_CLIENT:
      return {
        ...state,
        isAuth: true,
        client: action.payload,
      };
    case LOGIN:
      console.log("login reducer payload: ", action.payload);
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        client: action.payload,
        isLoad: false,
        isAuth: true,
      };
    case POST_NEW_CLIENT_ERROR:
    case LOGIN_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        client: action.payload,
        isLoad: false,
        isAuth: false,
      };
    case LOGOUT:
    case DELETE_CLIENT:
      localStorage.removeItem("token");
      return {
        ...state,
        client: null,
        isLoad: false,
        isAuth: false,
        isSignin: false,
      };
    case POST_NEW_CLIENT:
      return {
        ...state,
        client: action.payload,
        isLoad: false,
        isAuth: false,
        isSignin: true,
      };
    default:
      return state;
  }
};
