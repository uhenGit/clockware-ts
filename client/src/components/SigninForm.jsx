import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signin, inprocess } from "../actions/clientAction";

class SigninForm extends Component {
  state = {
    name: "",
    mail: "",
    city: "",
    password: "",
    borderColor: "",
    isSignin: false,
  };
  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (this.state.name.length < 3) {
      this.setState({
        borderColor: "red",
      });
    } else {
      this.setState({
        borderColor: "green",
      });
    }
  };
  formSubmit = (e) => {
    e.preventDefault();
    if (this.state.name.length < 4) {
      return alert("имя должно быть не менее 4 символов");
    }
    if (
      this.state.mail === "" ||
      this.state.password === "" ||
      this.state.name === "" ||
      this.state.city === ""
    ) {
      return alert("все поля обязательны");
    }
    const client = {
      mail: this.state.mail,
      password: this.state.password,
      name: this.state.name,
      city: this.state.city,
    };
    this.props.inprocess();
    this.props.signin(client.mail, client.name, client.city, client.password);
    this.setState({
      name: "",
      mail: "",
      city: "",
      password: "",
    });
  };
  render() {
    if (this.props.isLoad) {
      return <h2>Loading...</h2>;
    }
    if (this.props.isSignin) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <div className="form_wrap">
          <h2>Sign In</h2>
          <form onSubmit={this.formSubmit}>
            {this.props.client !== null && !this.props.isSignin ? (
              <h3>{this.props.client.toString()}</h3>
            ) : null}
            <label>
              <span>Введите имя:</span>
              <span className="secondary">не короче 3 символов</span>
              <input
                style={{ borderColor: this.state.borderColor }}
                type="text"
                name="name"
                placeholder="логин"
                value={this.state.name}
                onChange={this.changeInput}
              />
            </label>
            <label>
              <span>Введите email:</span>
              <input
                type="email"
                name="mail"
                placeholder="email"
                value={this.state.mail}
                onChange={this.changeInput}
              />
            </label>
            <label>
              <span>Введите город:</span>
              <input
                type="text"
                name="city"
                placeholder="город"
                value={this.state.city}
                onChange={this.changeInput}
              />
            </label>
            <label>
              <span>Введите пароль:</span>
              <input
                type="password"
                name="password"
                placeholder="пароль"
                value={this.state.password}
                onChange={this.changeInput}
              />
            </label>
            <div className="btn_wrap">
              <button type="submit">Sign In</button>
              <Link to="/">
                <button>Отмена</button>
              </Link>
            </div>
            <div className="btn_wrap">
              <span>Уже есть аккаунт?</span>
              <Link to="/login">Войдите</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => (
  console.log("signin state: ", state),
  {
    client: state.clients.client,
    isLoad: state.clients.isLoad,
    isSignin: state.clients.isSignin,
  }
);
export default connect(mapStateToProps, { signin, inprocess })(SigninForm);
