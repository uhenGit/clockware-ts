import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getCities,
  addCity,
  deleteCity,
  inprocess,
} from "../actions/cityAction";

class City extends Component {
  state = {
    city: "",
  };
  componentDidMount() {
    this.props.getCities();
  }
  delItem = (id) => {
    this.props.deleteCity(id);
    this.props.inprocess();
    this.props.getCities();
  };
  handleInput = (e) => {
    this.setState({
      city: e.target.value,
    });
  };
  addCity = (e) => {
    e.preventDefault();
    this.props.addCity(this.state.city);
    this.props.inprocess();
    this.props.getCities();
  };
  render() {
    if (this.props.isLoad) {
      return <h2>Wait...</h2>;
    }
    return (
      <div>
        <h2>Cities</h2>
        <ul>
          {this.props.cities.cities.map((city) => {
            let { name, id } = city;
            return (
              <li key={id} className="list">
                {name}
                <button onClick={() => this.delItem(id)}>Del</button>
              </li>
            );
          })}
        </ul>
        <form onSubmit={this.addCity}>
          <label>
            <span>Введите название города</span>
            <input
              type="text"
              name="city"
              value={this.state.cities}
              onChange={this.handleInput}
            />
          </label>
          <button type="submit">Добавить город</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  cities: state.cities,
  isLoad: state.cities.isLoad,
});
export default connect(mapStateToProps, {
  getCities,
  addCity,
  deleteCity,
  inprocess,
})(City);
