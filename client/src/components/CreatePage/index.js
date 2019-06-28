import React, { Component } from "react";
import API from "../../utils/API";
import "./style.css";

class CreatePage extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    API.saveTodo({
      title: this.state.title,
      description: this.state.description
    })
      .then(res => res.redirect("/"))
      .catch(err => console.log(err));
    this.setState({ title: "", description: "" });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div id="display-area-z" className="col-12">
            <h1>Enter your Todo:</h1>
            <form
              className="todo-form"
              onSubmit={this.handleSubmit}
              action="/api/todos"
              method="POST"
            >
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={this.state.title}
                onChange={this.handleInputChange}
              />
              <input
                type="text"
                placeholder="Description"
                name="description"
                value={this.state.description}
                onChange={this.handleInputChange}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePage;
