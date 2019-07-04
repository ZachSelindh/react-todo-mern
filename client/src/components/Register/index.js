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
      email: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    if (
      this.state.username.length &&
      this.state.password.length &&
      this.state.photoURL.length &&
      this.state.email.length
    ) {
      API.registerUser({
        username: this.state.username,
        password: this.state.password,
        photoURL: this.state.photoURL,
        email: this.state.email
      })
        .then(res => console.log(res))
        .catch(err => console.log(err));
      this.setState({
        username: "",
        password: "",
        password2: "",
        photoURL: "",
        email: ""
      });
    } else if (this.state.password !== this.state.password2) {
      console.log("Passwords do not match");
    } else {
      console.log("No");
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
        <p> Enter your information </p>
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
          <input
            type="text"
            placeholder="Repeat Password"
            name="password2"
            value={this.state.password2}
            onChange={this.handleInputChange}
          />
          <br />
          <br />
          <input
            type="text"
            placeholder="Photo URL"
            name="photoURL"
            value={this.state.photoURL}
            onChange={this.handleInputChange}
          />
          <br />
          <br />
          <input
            type="text"
            placeholder="Email Address"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
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
