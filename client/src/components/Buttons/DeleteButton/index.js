import React, { Component } from "react";
import API from "../../../utils/API";
import "./style.css";

class DeleteButton extends Component {
  handleClick = () => {
    var currentUser = localStorage.getItem("currentUser");
    var thisPostid = this.props.todoID;
    if (
      typeof currentUser !== "undefined" &&
      typeof thisPostid !== "undefined"
    ) {
      API.deleteTodo(thisPostid, localStorage.getItem("token"))
        .then(res => {
          console.log(res);
          this.props.calltodbNotCompleted();
        })
        .catch(err => console.log(err));
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
