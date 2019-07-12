import React, { Component } from "react";
import "./style.css";
import API from "../../utils/API";
import history from "../../utils/history";

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: []
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    // Check if username or password fields are blank.
    if (this.state.username.length && this.state.password.length) {
      API.loginUser({
        username: this.state.username,
        password: this.state.password
      })
        // Logging JWT
        .then(response => {
          console.log(response);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("currentUser", response.data.currentUser);
          this.setState({
            username: "",
            password: ""
          });
          history.push(response.data.redirectURL);
        })
        .catch(err => {
          this.setState({
            errors: [{ nameError: "Username or password do not match" }]
          });
        });
    } else {
      this.setState({
        errors: [{ nameError: "You must fill in both fields" }]
      });
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="login-page">
        <h1>User Login</h1>
        <p> Enter your username and password </p>
        <form className="todo-form" onSubmit={this.handleSubmit}>
          {this.state.errors.length
            ? this.state.errors.map(error =>
                error.nameError ? (
                  <p className="error-message" key={error.nameError}>
                    {error.nameError}
                  </p>
                ) : null
              )
            : null}
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
          <a href="/registration">
            <br />
            <br />
            <p>I don't have an account</p>
          </a>
        </form>
        <p> Password and username are case sensitive </p>
      </div>
    );
  }
}

export default LoginPage;
