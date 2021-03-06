import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/clientAction";
import store from "../store";

class Home extends Component {
  componentDidMount() {
    if (
      localStorage.getItem("token") &&
      store.getState().clients.client !== null
    ) {
      this.setState({
        isLogin: true,
      });
    } else {
      this.setState({
        isLogin: false,
      });
    }
  }
  state = {
    isLogin: null,
  };
  logOut = () => {
    this.props.logout();
    this.setState({
      isLogin: false,
    });
  };
  render() {
    return (
      <div className="home">
        {!this.state.isLogin ? (
          <div className="user_action">
            <h2>Home Page</h2>
            <Link to="/signin">
              <button>Зарегистрируйтесь</button>
            </Link>
            <p>или</p>
            <Link to="/login">
              <button>Войдите</button>
            </Link>
          </div>
        ) : (
          <div className="user_action">
            {store.getState().clients.client !== null &&
            store.getState().clients.client.isAdmin ? (
              <Link to="/dashboard">
                <button>Dashboard</button>
              </Link>
            ) : null}
            <Link to="/cabinet">
              <button>В кабинет</button>
            </Link>
            <p>или</p>
            <button onClick={this.logOut}>Выход</button>
          </div>
        )}
      </div>
    );
  }
}
export default connect(null, { logout })(Home);
