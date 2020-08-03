import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";

class OrderForm extends Component {
  state = {
    name: "",
    mail: "",
    city: "",
    clock_size: "",
    date: "",
    time: "",
    redir: false,
  };
  componentDidMount() {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user")).user;
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
    console.log(this.state);
    // todo: add master filter (relation first)
  };
  render() {
    if (this.state.redir) {
      return <Redirect to="/login" />;
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
              <select name="clock_size" onChange={this.handleInput}>
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
export default OrderForm;
