import React, { Component } from "react";
import API from "../../utils/API";
import "./style.css";

class Display extends Component {
  constructor() {
    super();
    this.state = {
      pulledTodos: []
    };
  }
  componentDidMount = () => {
    API.getTodos()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="row">
        <div className="col-lg-10 col-md-12" />
      </div>
    );
  }
}

export default Display;
