import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/clientAction";
import OrderForm from "./OrderForm";
import EditOrder from "./EditOrder";
import EditClient from "./EditClient";
import Intro from "./Intro";
import store from "../store";

class Cabinet extends Component {
  state = {
    clientName: "",
    redir: false,
    selectedInput: "intro",
  };
  componentDidMount() {
    if (store.getState().clients.client === null) {
      this.setState({
        redir: true,
      });
      localStorage.removeItem("token");
    } else {
      let client = store.getState().clients.client.user;
      this.setState({
        clientName: client.name,
      });
    }
  }
  handleChange = (e) => {
    this.setState({
      selectedInput: e.target.name,
    });
  };
  logOut = () => {
    this.props.logout();
    this.setState({
      redir: true,
    });
  };
  render() {
    let block;
    if (this.state.redir) {
      return <Redirect to="/login" />;
    }
    switch (this.state.selectedInput) {
      case "intro":
        block = <Intro />;
        break;
      case "newOrder":
        block = <OrderForm />;
        break;
      case "editOrder":
        block = <EditOrder />;
        break;
      case "editData":
        block = <EditClient />;
        break;
      default:
        break;
    }

    return (
      <div className="cabinet_wrap">
        <div className="left_block">
          <h2>Cabinet</h2>
          <Link to="/">Home</Link>
          <h3>Hello {this.state.clientName}</h3>
          <button onClick={this.logOut}>Выход</button>
          <form>
            <label
              className={
                this.state.selectedInput === "intro"
                  ? "toggle_input active"
                  : "toggle_input"
              }
            >
              <input
                type="radio"
                name="intro"
                checked={this.state.selectedInput === "intro"}
                onChange={this.handleChange}
              />
              <span className="radio_text">Инструкция</span>
            </label>
            <label
              className={
                this.state.selectedInput === "newOrder"
                  ? "toggle_input active"
                  : "toggle_input"
              }
            >
              <input
                type="radio"
                name="newOrder"
                checked={this.state.selectedInput === "newOrder"}
                onChange={this.handleChange}
              />
              <span className="radio_text">Заказать новую услугу</span>
            </label>

            <label
              className={
                this.state.selectedInput === "editOrder"
                  ? "toggle_input active"
                  : "toggle_input"
              }
            >
              <input
                type="radio"
                name="editOrder"
                checked={this.state.selectedInput === "editOrder"}
                onChange={this.handleChange}
              />
              <span className="radio_text">Редактировать заказ</span>
            </label>

            <label
              className={
                this.state.selectedInput === "editData"
                  ? "toggle_input active"
                  : "toggle_input"
              }
            >
              <input
                type="radio"
                name="editData"
                checked={this.state.selectedInput === "editData"}
                onChange={this.handleChange}
              />
              <span className="radio_text">Редактировать данные</span>
            </label>
          </form>
        </div>
        <div className="right_block">{block}</div>
      </div>
    );
  }
}
export default connect(null, { logout })(Cabinet);
