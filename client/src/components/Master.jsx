import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getMasters,
  addMaster,
  deleteMaster,
  inprocess,
} from "../actions/masterAction";
import { getCities } from "../actions/cityAction";

class Master extends Component {
  state = {
    master: "",
    city: "",
  };
  componentDidMount() {
    this.props.getMasters();
    this.props.getCities();
  }
  delItem = (id) => {
    this.props.deleteMaster(id);
    this.props.inprocess();
    this.props.getMasters();
  };
  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  changeCity = (e) => {
    this.setState({
      city: e.target.value,
    });
  };
  addMaster = (e) => {
    e.preventDefault();
    this.props.addMaster(this.state.master, this.state.city);
    this.props.inprocess();
    this.props.getMasters();
    this.setState({ master: "" });
  };
  render() {
    if (this.props.isLoad) {
      return <h2>Wait...</h2>;
    }
    return (
      <div>
        <h2>Masters</h2>
        <ul>
          {this.props.masters.masters.map((master) => {
            let { name, city, id } = master;
            return (
              <li key={id} className="list">
                <span>{name}</span>
                <span>{city}</span>
                <button onClick={() => this.delItem(id)}>Del</button>
              </li>
            );
          })}
        </ul>
        <form onSubmit={this.addMaster}>
          <label>
            <span>Введите имя мастера:</span>
            <input
              type="text"
              name="master"
              value={this.state.master}
              onChange={this.handleInput}
            />
          </label>
          <label>
            <span>Выберите город:</span>
            <select onChange={this.changeCity}>
              <option></option>
              {this.props.cities.cities.map((city) => {
                let { name, id } = city;
                return <option key={id}>{name}</option>;
              })}
            </select>
          </label>
          <button type="submit">Добавить мастера</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  masters: state.masters,
  isLoad: state.masters.isLoad,
  cities: state.cities,
});
export default connect(mapStateToProps, {
  getMasters,
  addMaster,
  deleteMaster,
  inprocess,
  getCities,
})(Master);
