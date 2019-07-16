import React, { Component } from "react";
import API from "../../../utils/API";
import history from "../../../utils/history";
import "./style.css";

class DeleteButton extends Component {
  handleClick = () => {
    var currentUser = localStorage.getItem("currentUser");
    var thisPostid = this.props.todoID;
    console.log(thisPostid);
    if (
      typeof currentUser !== "undefined" &&
      typeof thisPostid !== "undefined"
    ) {
      API.deleteTodo(
        { id: thisPostid, user: currentUser },
        localStorage.getItem("token")
      )
        .then(res => {
          if (res.data.deletedTodo.completed === true) {
            this.props.calltodbCompleted();
          } else if (res.data.deletedTodo.completed === false) {
            this.props.calltodbNotCompleted();
          } else {
            console.log(res);
          }
        })
        .catch(err => {
          if (err.response.status === 403) {
            localStorage.removeItem("currentUser");
            localStorage.removeItem("token");
            history.push("/login");
          } else {
            console.log(err);
          }
        });
    } else {
      console.log("Props not properly passed: Deletion failed.");
    }
  };

  render() {
    return (
      <button key={this.props.author} onClick={this.handleClick}>
        Delete
      </button>
    );
  }
}

export default DeleteButton;
