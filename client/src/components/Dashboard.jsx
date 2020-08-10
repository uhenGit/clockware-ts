import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/clientAction";
import Order from "./Order";
import City from "./City";
import Client from "./Client";
import Master from "./Master";
import AdminIntro from "./AdminIntro";
import store from "../store";

class Dashboard extends Component {
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
        block = <AdminIntro />;
        break;
      case "orders":
        block = <Order />;
        break;
      case "clients":
        block = <Client />;
        break;
      case "masters":
        block = <Master />;
        break;
      case "cities":
        block = <City />;
        break;
      default:
        break;
    }
    return (
      <div className="cabinet_wrap">
        <div className="left_block">
          <h2>Dashboard</h2>
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
                this.state.selectedInput === "orders"
                  ? "toggle_input active"
                  : "toggle_input"
              }
            >
              <input
                type="radio"
                name="orders"
                checked={this.state.selectedInput === "orders"}
                onChange={this.handleChange}
              />
              <span className="radio_text">Заказы</span>
            </label>

            <label
              className={
                this.state.selectedInput === "clients"
                  ? "toggle_input active"
                  : "toggle_input"
              }
            >
              <input
                type="radio"
                name="clients"
                checked={this.state.selectedInput === "clients"}
                onChange={this.handleChange}
              />
              <span className="radio_text">Клиенты</span>
            </label>

            <label
              className={
                this.state.selectedInput === "masters"
                  ? "toggle_input active"
                  : "toggle_input"
              }
            >
              <input
                type="radio"
                name="masters"
                checked={this.state.selectedInput === "masters"}
                onChange={this.handleChange}
              />
              <span className="radio_text">Мастера</span>
            </label>
            <label
              className={
                this.state.selectedInput === "cities"
                  ? "toggle_input active"
                  : "toggle_input"
              }
            >
              <input
                type="radio"
                name="cities"
                checked={this.state.selectedInput === "cities"}
                onChange={this.handleChange}
              />
              <span className="radio_text">Города</span>
            </label>
          </form>
        </div>
        <div className="right_block">{block}</div>
      </div>
    );
  }
}
export default connect(null, { logout })(Dashboard);
