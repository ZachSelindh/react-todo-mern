import React, { Component } from "react";
import "./style.css";
import API from "../../utils/API";

class ToDoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
  }

  componentWillMount = () => {
    API.getUsername(this.props.author)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="todo-item">
        <h1>{this.props.title}</h1>
        <h5>Submitted by: {this.props.author}</h5>
        <p>{this.props.description}</p>
        <h4>Status: {this.props.completed ? "Completed!" : "Incomplete"}</h4>
      </div>
    );
  }
}

export default ToDoItem;
