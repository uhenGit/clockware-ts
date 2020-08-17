import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/clientAction";
import store from "../store";

class LoginForm extends Component {
  state = {
    mail: "",
    password: "",
    isLogIn: null,
  };
  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  formSubmit = (e) => {
    e.preventDefault();
    const client = {
      mail: this.state.mail,
      password: this.state.password,
    };
    this.props.login(client.mail, client.password);
    this.setState({ mail: "", password: "" });
  };
  render() {
    if (this.props.isLoad) {
      return <h2>Loading...</h2>;
    }
    if (
      store.getState().clients.client !== null &&
      store.getState().clients.client.isAdmin
    ) {
      return <Redirect to="/dashboard" />;
    }
    if (this.props.isAuth) {
      return <Redirect to="/cabinet" />;
    }
    return (
      <div>
        <div className="form_wrap">
          <h2>Log In</h2>
          <form onSubmit={this.formSubmit}>
            {/* IF PASS OR LOGIN IS INVALID */}
            {this.props.data !== null && !this.props.isAuth ? (
              <h3>{this.props.data.msg}</h3>
            ) : null}
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
              <button type="submit">Log In</button>

              <Link to="/">
                <button>Отмена</button>
              </Link>
            </div>
            <div className="btn_wrap">
              <span>Еще нет аккаунта?</span>
              <Link to="/signin">Зарегистрируйтесь</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.clients.isAuth,
  data: state.clients.client,
  isLoad: state.clients.isLoad,
});
export default connect(mapStateToProps, { login })(LoginForm);
