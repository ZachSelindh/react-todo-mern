import React, { Component } from "react";
import API from "../../utils/API";
import history from "../../utils/history";
import "./style.css";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      validToken: false
    };
  }

  logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    history.push("/login");
  };

  componentDidMount = () => {
    API.checkToken(localStorage.getItem("token"))
      .then(
        res => console.log(res.data.message),
        this.setState({ validToken: true })
      )
      .catch(
        err => console.log(err.data.message),
        this.setState({ validToken: false })
        /* this.logoutUser() */
      );
  };

  render() {
    return (
      <div className="row todo-header">
        <div className="col-12">
          <div className="row">
            <div className="col-sm-12 col-md-5">
              <h1>MERN-stack Todo List</h1>
            </div>
            <div className="col-sm-6 col-md-3">
              <p>A full-stack todo app</p>
            </div>
            <div className="col-sm-6 col-md-4">
              <div id="nav-header-z" className="row">
                {this.state.validToken === true ? (
                  <div className="nav-bar-z">
                    <a className="nav-link-z" href="/">
                      Home
                    </a>
                    <a className="nav-link-z" href="/completed">
                      Completed
                    </a>
                    <a className="nav-link-z" href="/logout">
                      Logout
                    </a>
                  </div>
                ) : (
                  <a href="/login">Login</a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
