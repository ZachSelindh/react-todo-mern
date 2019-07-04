import React, { Component } from "react";
import "./style.css";
import API from "../../utils/API";

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    API.loginUser({});
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <h1>User Login</h1>
        <p> Enter your username and password </p>
        <form className="todo-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange}
          />
          <br />
          <br />
          <input
            type="text"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <br />
          <br />
          <button type="submit">Submit</button>
        </form>
        <p> Password and username are case sensitive </p>
      </div>
    );
  }
}

export default LoginPage;
