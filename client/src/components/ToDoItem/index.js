import React, { Component } from "react";
import "./style.css";
import API from "../../utils/API";
import history from "../../utils/history";

class ToDoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
  }

  componentDidMount = () => {
    API.getUser(this.props.author)
      .then(res => {
        this.setState({
          username: res.data.username
        });
      })
      .catch(err => console.log(err));
  };

  handleClick = () => {
    history.push(`/profile/${this.props.author}`);
  };

  render() {
    return (
      <div className="todo-item">
        <h1>{this.props.title}</h1>
        <h5>
          Submitted by:{" "}
          <span className="user-link" onClick={this.handleClick}>
            {this.state.username}
          </span>
        </h5>

        <p>{this.props.description}</p>
        <h4>Status: {this.props.completed ? "Completed!" : "Incomplete"}</h4>
      </div>
    );
  }
}

export default ToDoItem;
