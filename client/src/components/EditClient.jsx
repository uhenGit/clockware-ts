import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { deleteClient } from "../actions/clientAction";
import store from "../store";

class EditClient extends Component {
  state = {
    currentId: "",
    currentMail: "",
    currentName: "",
    currentCity: "",
    borderColor: "",
    redir: false,
  };
  componentDidMount() {
    const { mail, name, city, id } = store.getState().clients.client.user;
    this.setState({
      currentId: id,
      currentMail: mail,
      currentName: name,
      currentCity: city,
    });
  }
  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (this.state.currentName.length < 3) {
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
    if (this.state.currentName.length < 4) {
      return alert("имя должно быть не менее 4 символов");
    }
  };
  deleteClient = (e) => {
    e.preventDefault();
    this.props.deleteClient(this.state.currentId);
    // убрать костыль
    setTimeout(() => {
      this.setState({ redir: true });
    }, 400);
  };
  render() {
    if (this.state.redir) {
      return <Redirect to="/" />;
    }
    return (
      <div className="form_wrap">
        <h2>Edit Client</h2>
        <form onSubmit={this.formSubmit}>
          <label>
            <span>Введите новое Имя</span>
            <span className="secondary">не короче 4 символов</span>
            <input
              type="text"
              name="currentName"
              style={{ borderColor: this.state.borderColor }}
              value={this.state.currentName}
              onChange={this.handleInput}
            />
          </label>
          <label>
            <span>Ввведите новый e-mail</span>
            <input
              type="text"
              name="currentMail"
              value={this.state.currentMail}
              onChange={this.handleInput}
            />
          </label>
          <label>
            <span>Введите новый город</span>
            <input
              type="text"
              name="currentCity"
              value={this.state.currentCity}
              onChange={this.handleInput}
            />
          </label>
          <button type="submit">Отправить</button>
          <button onClick={this.deleteClient}>Delete</button>
        </form>
      </div>
    );
  }
}

export default connect(null, { deleteClient })(EditClient);
