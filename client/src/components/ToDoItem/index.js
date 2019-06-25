import React, { Component } from "react";
import "./style.css";

class ToDoItem extends Component {
  render() {
    return (
      <div className="todo-item">
        <h1>{this.props.title}</h1>
        <h5>Submitted by: {this.props.author}</h5>
        <p>{this.props.description}</p>
        <h4>Completed: {this.props.completed ? "True" : "False"}</h4>
      </div>
    );
  }
}

export default ToDoItem;
