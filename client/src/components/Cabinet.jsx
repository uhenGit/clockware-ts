import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import OrderForm from "./OrderForm";
import EditOrder from "./EditOrder";
import EditClient from "./EditClient";
import Intro from "./Intro";

class Cabinet extends Component {
  state = {
    clientName: "",
    clientMail: "",
    clientCity: "",
    redir: false,
    selectedInput: "intro",
  };
  componentDidMount() {
    if (JSON.parse(localStorage.getItem("user")) === null) {
      this.setState({
        redir: true,
      });
    } else {
      let client = JSON.parse(localStorage.getItem("user")).user;
      this.setState({
        clientName: client.name,
        clientMail: client.mail,
        clientCity: client.city,
      });
    }
    console.log(this.state);
  }
  handleChange = (e) => {
    this.setState({
      selectedInput: e.target.name,
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
    const checkBcgr = {
      backgroundColor: "rgb(169,169,169)",
    };
    return (
      <div className="cabinet_wrap">
        <div className="left_block">
          <h2>Cabinet</h2>
          <Link to="/">Home</Link>
          <h3>Hello {this.state.clientName}</h3>
          <form>
            <label
              style={{
                ...checkBcgr,
                backgroundColor:
                  this.state.selectedInput === "intro"
                    ? "rgb(169,169,169)"
                    : "transparent",
              }}
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
              style={{
                ...checkBcgr,
                backgroundColor:
                  this.state.selectedInput === "newOrder"
                    ? "rgb(169,169,169)"
                    : "transparent",
              }}
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
              style={{
                ...checkBcgr,
                backgroundColor:
                  this.state.selectedInput === "editOrder"
                    ? "rgb(169,169,169)"
                    : "transparent",
              }}
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
              style={{
                ...checkBcgr,
                backgroundColor:
                  this.state.selectedInput === "editData"
                    ? "rgb(169,169,169)"
                    : "transparent",
              }}
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
export default Cabinet;
