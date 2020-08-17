import { GET_ALL_ORDERS, POST_NEW_ORDER, INPROCESS } from "./types";

export const getOrders = () => (dispatch) => {
  dispatch({ type: INPROCESS });
  const token = JSON.parse(localStorage.getItem("token"));
  fetch("/orders/all", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token,
    },
  })
    .then((res) => res.json())
    .then((data) =>
      dispatch({
        type: GET_ALL_ORDERS,
        payload: data,
      })
    )
    .catch((err) => console.log("get all orders error: ", err));
};

export const postOrder = (
  clientMail,
  cityName,
  masterName,
  clockSize,
  date,
  time
) => (dispatch) => {
  dispatch({ type: INPROCESS });
  const token = JSON.parse(localStorage.getItem("token"));
  const body = JSON.stringify({
    clientMail,
    cityName,
    masterName,
    clockSize,
    date,
    time,
  });
  fetch("/orders/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Auth-Token": token,
    },
    body,
  })
    .then((res) => res.json())
    .then((data) =>
      dispatch({
        type: POST_NEW_ORDER,
        payload: data,
      })
    )
    .catch((err) => console.log("post new order error: ", err));
};
