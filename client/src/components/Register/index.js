import React, { Component } from "react";
import "./style.css";
import API from "../../utils/API";

class RegisterPage extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      password2: "",
      photoURL: "",
      email: "",
      errors: []
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    // Check if registration fields are empty
    if (
      this.state.username.length &&
      this.state.password.length &&
      this.state.photoURL.length &&
      this.state.email.length
    ) {
      API.registerUser({
        username: this.state.username,
        password: this.state.password,
        password2: this.state.password2,
        photoURL: this.state.photoURL,
        email: this.state.email
      })
        .then(res => {
          if (res.status === 200) {
            this.setState({
              username: "",
              password: "",
              password2: "",
              photoURL: "",
              email: "",
              errors: []
            });
          } else {
            console.log(res.status);
          }
        })
        .catch(err => {
          var arrofErr = [...err.response.data.error.errors];
          this.setState({ errors: arrofErr });
        });
      // Turn this into a modal
      /* alert("Successful registration!"); */
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="register-page">
        <h1>User Registration</h1>
        <form className="todo-form" onSubmit={this.handleSubmit}>
          <p>Username: </p>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={this.state.username}
            onChange={this.handleInputChange}
          />
          {this.state.errors.length
            ? this.state.errors.map(error =>
                error.param === "username" ? (
                  <p className="error-message" key={error.param + error.value}>
                    {error.msg}
                  </p>
                ) : null
              )
            : null}
          <p>Password: </p>
          <input
            type="text"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <p>Repeat Password: </p>
          <input
            type="text"
            placeholder="Repeat Password"
            name="password2"
            value={this.state.password2}
            onChange={this.handleInputChange}
          />
          {this.state.errors.length
            ? this.state.errors.map(error =>
                error.param === "password" ? (
                  <p className="error-message" key={error.param + error.value}>
                    {error.msg}
                  </p>
                ) : null
              )
            : null}
          <p>Profile Picture URL: </p>
          <input
            type="text"
            placeholder="Photo URL"
            name="photoURL"
            value={this.state.photoURL}
            onChange={this.handleInputChange}
          />
          {this.state.errors.length
            ? this.state.errors.map(error =>
                error.param === "photoURL" ? (
                  <p className="error-message" key={error.param + error.value}>
                    {error.msg}
                  </p>
                ) : null
              )
            : null}
          <p>Email Address: </p>
          <input
            type="text"
            placeholder="Email Address"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
          {this.state.errors.length
            ? this.state.errors.map(error =>
                error.param === "email" ? (
                  <p className="error-message" key={error.param + error.value}>
                    {error.msg}
                  </p>
                ) : null
              )
            : null}
          <br />
          <br />
          <button type="submit">Submit</button>
          <a href="/login">
            <br />
            <br />
            <p>Take me to login</p>
          </a>
        </form>
        <p> All fields are case sensitive </p>
      </div>
    );
  }
}

export default RegisterPage;
