import { GET_ALL_CITIES, POST_NEW_CITY, DELETE_CITY, INPROCESS } from "./types";

export const inprocess = () => (dispatch) => {
  dispatch({ type: INPROCESS });
};

export const getCities = () => (dispatch) => {
  fetch("/cities/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: GET_ALL_CITIES,
        payload: data,
      });
    })
    .catch((err) => console.log("get cities action error: ", err));
};
export const addCity = (name) => (dispatch) => {
  const body = JSON.stringify({ name });
  const token = JSON.parse(localStorage.getItem("token"));
  fetch("/cities/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token,
    },
    body,
  })
    .then((res) => res.json())
    .then(
      dispatch({
        type: POST_NEW_CITY,
      })
    )
    .catch((err) => console.log("addCity error: ", err));
};

export const deleteCity = (id) => (dispatch) => {
  const token = JSON.parse(localStorage.getItem("token"));
  fetch(`/cities/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token,
    },
  })
    .then((res) => res.json())
    .then(
      dispatch({
        type: DELETE_CITY,
      })
    )
    .catch((err) => console.log("action delete error: ", err));
};
