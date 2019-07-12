import React, { Component } from "react";
import "./style.css";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: []
    };
  }

  componentWillMount = () => {
    var theUser = localStorage.getItem("currentUser");
    this.setState({ currentUser: theUser });
    console.log(theUser);
  };

  render() {
    return (
      <div className="row todo-header">
        <div className="col-12">
          <div className="row">
            <div className="col-sm-6 col-md-5">
              <h1>MERN-stack Todo List</h1>
            </div>
            <div className="col-sm-6 col-md-3">
              <p>A full-stack todo app</p>
            </div>
            <div className="col-sm-12 col-md-4">
              <div id="nav-header-z" className="row">
                {this.state.currentUser !== "undefined" &&
                !this.state.currentUser.length ? (
                  <div>
                    <a href="/">Home</a>
                    <a href="/completed">Completed</a>
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
