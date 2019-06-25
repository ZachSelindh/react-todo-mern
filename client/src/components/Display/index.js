import React, { Component } from "react";
import API from "../../utils/API";
import "./style.css";
import ToDoItem from "../ToDoItem";

class Display extends Component {
  constructor() {
    super();
    this.state = {
      pulledTodos: []
    };
  }
  componentDidMount = () => {
    API.getTodos()
      .then(res => this.setState({ pulledTodos: res.data }))
      .catch(err => console.log(err));
  };

  // API call to fill DB with more items
  /* componentDidMount = () => {
    API.saveTodo({
      title: "Oh man, another?",
      author: "Zach2",
      description: "Get this done",
      completed: false,
      submitted_at: Date.now
    })
      .then(res => this.setState({ pulledTodos: res.data }))
      .catch(err => console.log(err));
  }; */

  render() {
    return (
      <div className="container">
        <div className="row">
          <div id="display-area-z" className="col-12">
            <h1>Todo List:</h1>
            {this.state.pulledTodos.length ? (
              this.state.pulledTodos.map(Todo => {
                return Todo.completed === false ? (
                  <ToDoItem
                    key={Todo._id}
                    title={Todo.title}
                    author={Todo.author}
                    description={Todo.description}
                    completed={Todo.completed}
                  />
                ) : null;
              })
            ) : (
              <h3>No Results</h3>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Display;
