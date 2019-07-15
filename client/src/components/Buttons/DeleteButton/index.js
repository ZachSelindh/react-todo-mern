import React, { Component } from "react";
import "./style.css";

class DeleteButton extends Component {
  handleClick = () => {
    console.log(this.props.author);
  };

  render() {
    return (
      <button key={this.props.author} onClick={this.handleClick}>
        Delete Todo
      </button>
    );
  }
}

export default DeleteButton;
