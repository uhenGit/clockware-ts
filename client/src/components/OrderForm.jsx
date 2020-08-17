import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import AvailableMaster from "./AvailableMaster";
import { postOrder, getOrders } from "../actions/orderAction";
import store from "../store";

class OrderForm extends Component {
  state = {
    name: "",
    mail: "",
    city: "",
    clockSize: "",
    date: "",
    time: "",
    master: "",
    redir: false,
  };
  componentDidMount() {
    this.props.getOrders();
    if (localStorage.getItem("token")) {
      const user = store.getState().clients.client.user;
      this.setState({
        name: user.name,
        mail: user.mail,
        city: user.city,
      });
    } else {
      this.setState({
        redir: true,
      });
    }
  }
  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  formSubmit = (e) => {
    e.preventDefault();
    const { name, mail, city, clockSize, date, time, master } = this.state;
    if (
      name === "" ||
      mail === "" ||
      city === "" ||
      clockSize === "" ||
      date === "" ||
      time === ""
    ) {
      alert("All fields require!");
    } else {
      console.log("load before postOrde");
      this.props.postOrder(mail, city, master, clockSize, date, time);
      console.log("load after postOrde: ");
      this.props.getOrders();
      console.log(this.props);
    }
  };
  render() {
    if (this.state.redir) {
      return <Redirect to="/login" />;
    }
    if (this.props.isLoad) {
      return <h2>Wait...</h2>;
    }
    return (
      <div>
        <div className="form_wrap">
          <h2>Форма заказа</h2>
          <form onSubmit={this.formSubmit}>
            <label>
              <span>Имя:</span>
              <input type="text" disabled placeholder={this.state.name} />
            </label>
            <label>
              <span>Email:</span>
              <input type="text" disabled placeholder={this.state.mail} />
            </label>
            <label>
              <span>Город:</span>
              <input type="text" disabled placeholder={this.state.city} />
            </label>
            <label>
              <span>Размер часов:</span>
              <select name="clockSize" onChange={this.handleInput}>
                <option></option>
                <option value="sm">small</option>
                <option value="med">medium</option>
                <option value="lg">large</option>
              </select>
            </label>
            <label>
              <span>Выберите дату:</span>
              <input
                type="date"
                name="date"
                value={this.state.date}
                onChange={this.handleInput}
              />
            </label>
            <label>
              <span>Введите время:</span>
              <span className="secondary">в формате чч.мм</span>
              <input
                type="text"
                name="time"
                placeholder="14.00"
                value={this.state.time}
                onChange={this.handleInput}
              />
            </label>
            <label>
              <span>Введите мастера:</span>
              <input
                type="text"
                name="master"
                value={this.state.master}
                onChange={this.handleInput}
              />
            </label>
            {this.state.date !== "" && this.state.time !== "" ? (
              <AvailableMaster />
            ) : null}
            <div className="btn_wrap">
              <button type="submit">Send</button>
              <Link to="/">
                <button>Отмена</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  console.log("state: ", state),
  {
    orders: state.orders.orders,
    isLoad: state.orders.isLoad,
  }
);
export default connect(mapStateToProps, { getOrders, postOrder })(OrderForm);
