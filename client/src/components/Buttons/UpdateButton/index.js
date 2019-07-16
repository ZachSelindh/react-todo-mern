import React, { Component } from "react";
import API from "../../../utils/API";
import "./style.css";

class DeleteButton extends Component {
  handleClick = () => {
    var todoID = this.props.todoID;
    console.log(todoID);
    API.getTodo(todoID, localStorage.getItem("token"))
      .then(res => console.log(res.data))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <button key={this.props.author} onClick={this.handleClick}>
        Update
      </button>
    );
  }
}

export default DeleteButton;
