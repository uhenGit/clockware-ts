import {
  POST_NEW_MASTER,
  DELETE_MASTER,
  GET_ALL_MASTERS,
  INPROCESS,
} from "./types";

// export const inprocess = () => (dispatch) => {
//   dispatch({ type: INPROCESS });
// };

export const getMasters = () => (dispatch) => {
  dispatch({ type: INPROCESS });
  const token = JSON.parse(localStorage.getItem("token"));
  fetch("/masters/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch({
        type: GET_ALL_MASTERS,
        payload: data,
      });
    })
    .catch((err) => console.log("get masters error: ", err));
};
export const addMaster = (name, city) => (dispatch) => {
  dispatch({ type: INPROCESS });
  const token = JSON.parse(localStorage.getItem("token"));
  const body = JSON.stringify({ name, city });
  fetch("/masters/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token,
    },
    body,
  })
    .then((res) => res.json())
    .then((data) => dispatch({ type: POST_NEW_MASTER, payload: data }))
    .catch((err) => console.log("add new master error: ", err));
};
export const deleteMaster = (id) => (dispatch) => {
  dispatch({ type: INPROCESS });
  const token = JSON.parse(localStorage.getItem("token"));
  fetch(`/masters/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token,
    },
  })
    .then((res) => res.json())
    .then((data) => dispatch({ type: DELETE_MASTER, payload: id }))
    .catch((err) => console.log("delete master error: ", err));
};
