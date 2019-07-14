import React, { Component } from "react";
import API from "../../utils/API";
import "./style.css";

class CreateBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    API.saveTodo(
      {
        title: this.state.title,
        description: this.state.description,
        author: localStorage.getItem("currentUser")
      },
      localStorage.getItem("token")
    )
      // Calls the function passed as props, which calls the database to re-load the pulled items.
      .then(res => console.log(res), this.props.calltodbNotCompleted())
      .catch(err => console.log(err));
    this.setState({ title: "", description: "" });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <h1>Enter new Todo:</h1>
        <form
          className="todo-form"
          autoComplete="off"
          onSubmit={this.handleSubmit}
          action="/api/todos"
          method="POST"
        >
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={this.title}
            onChange={this.handleInputChange}
          />
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={this.description}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default CreateBar;
