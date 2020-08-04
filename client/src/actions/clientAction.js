import {
  INPROCESS,
  GET_ALL_CLIENTS,
  GET_ONE_CLIENT,
  LOGIN,
  LOGIN_ERROR,
  LOGOUT,
  POST_NEW_CLIENT,
  //UPDATE_CLIENT,
  DELETE_CLIENT,
  POST_NEW_CLIENT_ERROR,
} from "./types";

export const inprocess = () => (dispatch) => {
  dispatch({ type: INPROCESS });
};

export const signin = (mail, name, city, password) => (dispatch) => {
  let body = JSON.stringify({ mail, name, city, password });
  fetch("/clients/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (!data.isSignin) {
        dispatch({ type: POST_NEW_CLIENT_ERROR, payload: data });
      } else {
        dispatch({ type: POST_NEW_CLIENT, payload: data });
      }
      console.log("redux sign in data: ", data);
    })
    .catch((err) => console.log("redux sign in error: ", err));
};

export const login = (mail, password) => (dispatch) => {
  const body = JSON.stringify({ mail, password });
  fetch("/clients/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body,
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (!data.isAuth) {
        dispatch({
          type: LOGIN_ERROR,
          payload: data,
        });
      } else {
        dispatch({
          type: LOGIN,
          payload: data,
        });
      }
    })
    .catch((err) => console.log("redux login error: ", err));
};
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

export const deleteClient = (id) => (dispatch) => {
  const token = JSON.parse(localStorage.getItem("token"));
  fetch(`/clients/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token,
    },
  })
    .then((res) => res.json())
    .then(
      dispatch({
        type: DELETE_CLIENT,
      })
    )
    .catch((err) => console.log("action delete error: ", err));
};

export const getOne = (id) => (dispatch) => {
  const token = JSON.parse(localStorage.getItem("token"));
  fetch(`/clients/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token,
    },
  })
    .then((res) => res.json())
    .then((client) => {
      console.log("GET_ONE: ", client);
      dispatch({
        type: GET_ONE_CLIENT,
        payload: client,
      });
    })
    .catch((err) => console.log("action GET_ONE error: ", err));
};

export const getAllClients = () => (dispatch) => {
  const token = JSON.parse(localStorage.getItem("token"));
  fetch("/clients/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token,
    },
  })
    .then((res) => res.json())
    .then((clients) => {
      dispatch({
        type: GET_ALL_CLIENTS,
        payload: clients,
      });
    })
    .catch((err) => console.log("redux clients error: ", err));
};
