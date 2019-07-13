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
            // Turn this into a modal
            alert("Successful registration!");
          } else {
            console.log(res.status);
          }
        })
        .catch(err => {
          var arrofErr = [...err.response.data.error.errors];
          this.setState({ errors: arrofErr });
        });
    } else {
      var currentErrors = this.state.errors;
      currentErrors.push({ param: "top", msg: "All fields must be filled in" });
      this.setState({ errors: currentErrors });
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div id="display-area-z" className="register-page col-12">
        <div className="row">
          <div id="user-display" className=" col-sm-12 col-md-4">
            <img
              alt="User Display"
              src={
                this.state.photoURL.length
                  ? this.state.photoURL
                  : "https://png.pngtree.com/svg/20161110/d3396c299f.svg"
              }
              height="200px"
              width="200px"
            />
            <h2>{this.state.username}</h2>
          </div>
          <div className="col-sm-12 col-md-8">
            <h1>User Registration</h1>
            <form
              className="todo-form"
              autocomplete="off"
              onSubmit={this.handleSubmit}
            >
              {this.state.errors.length
                ? this.state.errors.map(error =>
                    error.param === "top" ? (
                      <p
                        className="error-message"
                        key={error.param + error.value}
                      >
                        {error.msg}
                      </p>
                    ) : null
                  )
                : null}
              <div className="form-item">
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
                        <p
                          className="error-message"
                          key={error.param + error.value}
                        >
                          {error.msg}
                        </p>
                      ) : null
                    )
                  : null}
              </div>
              <div className="form-item">
                <p>Password: </p>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="form-item">
                <p>Repeat Password: </p>
                <input
                  type="password"
                  placeholder="Repeat Password"
                  name="password2"
                  value={this.state.password2}
                  onChange={this.handleInputChange}
                />
                {this.state.errors.length
                  ? this.state.errors.map(error =>
                      error.param === "password" ? (
                        <p
                          className="error-message"
                          key={error.param + error.value}
                        >
                          {error.msg}
                        </p>
                      ) : null
                    )
                  : null}
              </div>
              <div className="form-item">
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
                        <p
                          className="error-message"
                          key={error.param + error.value}
                        >
                          {error.msg}
                        </p>
                      ) : null
                    )
                  : null}
              </div>
              <div className="form-item">
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
                        <p
                          className="error-message"
                          key={error.param + error.value}
                        >
                          {error.msg}
                        </p>
                      ) : null
                    )
                  : null}
              </div>
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
        </div>
      </div>
    );
  }
}

export default RegisterPage;
