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
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
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
          <input
            type="text"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            placeholder="Repeat Password"
            name="password2"
            value={this.state.password2}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            placeholder="Photo URL"
            name="photoURL"
            value={this.state.photoURL}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            placeholder="Email Address"
            name="email"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default RegisterPage;
