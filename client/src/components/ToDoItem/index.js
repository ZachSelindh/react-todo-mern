import React, { Component } from "react";
import DeleteButton from "../Buttons/DeleteButton";
import UpdateButton from "../Buttons/UpdateButton";
import CompleteButton from "../Buttons/CompleteButton";
import API from "../../utils/API";
import history from "../../utils/history";
import "./style.css";

class ToDoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      validUser: false,
      currentAuthor: false
    };
  }

  componentDidMount = () => {
    if (localStorage.getItem("currentUser") === this.props.author) {
      this.setState({ currentAuthor: true });
    }
    API.getUser(this.props.author, localStorage.getItem("token"))
      .then(res => {
        this.setState({
          username: res.data.username,
          validUser: true
        });
      })
      .catch(err => {
        if (err.response.status === 422) {
          this.setState({ username: "User not found", validUser: false });
        }
      });
  };

  handleClick = () => {
    history.push(`/profile/${this.props.author}`);
  };

  render() {
    return (
      <div className="container todo-item">
        <div className="row">
          <div className="col-12">
            <h1>{this.props.title}</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <h5>
              Submitted by:{" "}
              {this.state.validUser ? (
                <span className="user-link" onClick={this.handleClick}>
                  {this.state.username}
                </span>
              ) : (
                <span>{this.state.username}</span>
              )}
            </h5>

            <p>{this.props.description}</p>
            <h4>
              Status: {this.props.completed ? "Completed!" : "Incomplete"}
            </h4>
          </div>

          <div className="col-4">
            {this.state.currentAuthor ? (
              <div>
                {this.props.completed ? null : (
                  <div>
                    <CompleteButton
                      todoID={this.props.todoID}
                      author={this.props.author}
                      calltodbNotCompleted={this.props.calltodbNotCompleted}
                    />
                    <UpdateButton todoID={this.props.todoID} />
                  </div>
                )}
                <DeleteButton
                  todoID={this.props.todoID}
                  author={this.props.author}
                  calltodbNotCompleted={this.props.calltodbNotCompleted}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default ToDoItem;
