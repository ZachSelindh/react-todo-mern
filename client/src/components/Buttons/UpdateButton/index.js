import React, { Component } from "react";
import API from "../../../utils/API";
import history from "../../../utils/history";
import "./style.css";

class DeleteButton extends Component {
  handleClick = () => {
    var todoID = this.props.todoID;
    console.log(todoID);
    API.getTodo(todoID, localStorage.getItem("token"))
      .then(res =>
        history.push({
          pathname: `/edit/todo/${todoID}`,
          state: { props: res.data }
        })
      )
      .catch(err => {
        if (err.response.status === 403) {
          history.push("/login");
        } else {
          console.log(err);
        }
      });
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
