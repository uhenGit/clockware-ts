import React, { Component } from "react";
import { Provider } from "react-redux";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import LoginForm from "./LoginForm";
import Cabinet from "./Cabinet";
import SigninForm from "./SigninForm";
import OrderForm from "./OrderForm";
import store from "../store";
import "../App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={LoginForm} />
          <Route path="/cabinet" component={Cabinet} />
          <Route path="/signin" component={SigninForm} />
          <Route path="/newOrder" component={OrderForm} />
        </Switch>
      </Provider>
    );
  }
}
export default App;
