import React, { Component } from "react";
import "./style.css";

class ToDoItem extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}

export default ToDoItem;
