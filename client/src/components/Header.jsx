import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/clientAction";
import store from "../store";
import clock from "../assets/clock.svg";

class Header extends Component {
  componentDidMount() {
    this.setState({
      show: store.getState().clients.isAuth,
    });
  }
  state = {
    show: null,
  };
  logOut = () => {
    this.props.logout();
    this.setState({
      show: false,
    });
  };
  render() {
    return (
      <header>
        <Link to="/">
          <img src={clock} alt="to home page" title="To Home Page" />
        </Link>
        <div className="subheader_wrap">
          <h2>Clockwise Clockware</h2>
          <p>Give us Your problem</p>
          <p>and take a solution</p>
        </div>
        {this.state.show ? (
          <div className="user_action">
            <Link to="/cabinet">
              <button>В кабинет</button>
            </Link>
            <p>или</p>
            <button onClick={this.logOut}>Выход</button>
          </div>
        ) : null}
      </header>
    );
  }
}
export default connect(null, { logout })(Header);
